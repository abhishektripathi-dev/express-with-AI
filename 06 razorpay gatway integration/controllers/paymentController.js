const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/Payment");
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
    try {
        const { amount, currency, receipt } = req.body;

        const order = await razorpay.orders.create({
            amount: amount * 100, // converting to paise
            currency: currency,
            receipt: receipt,
        });

        // Save the order in the database
        await Payment.create({
            order_id: order.id,
            amount: amount,
            currency: currency,
            status: "PENDING",
        });

        res.json({ order, key_id: process.env.RAZORPAY_KEY_ID });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create order" });
    }
};

exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        // Verify the payment signature
        const generated_signature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ error: "Invalid payment verification" });
        }

        // Update the payment status in the database
        await Payment.update(
            { status: "COMPLETED", payment_id: razorpay_payment_id },
            { where: { order_id: razorpay_order_id } }
        );

        res.json({ success: true, message: "Payment verified successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to verify payment" });
    }
};