import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
    {
        subscriber: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }, // The channel who is subscribing
        subscription: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }, // The channel being subscribed to
    },
    { timestamps: true }
);

SubscriptionSchema.index(
    {
        subscriber: 1,
        subscription: 1
    },
    { unique: true }
); // Prevents duplicate subscriptions

export const Subscription = mongoose.model("Subscription", SubscriptionSchema);
