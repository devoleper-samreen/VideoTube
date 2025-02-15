import { Subscription } from "../models/subscription.js";

export const subscribeUser = async (req, res) => {
    try {
        const { id: subscriber } = req.user; // Logged-in user
        const { id: subscription } = req.params; // Target user

        if (subscriber === subscription) {
            return res.status(400).json({
                message: "You cannot subscribe to yourself!"
            });
        }

        // Check if already subscribed
        const existingSubscription = await Subscription.findOne({ subscriber, subscription });

        if (existingSubscription) {
            return res.status(400).json({
                message: "Already subscribed!"
            });
        }

        // Create new subscription entry
        await new Subscription({ subscriber, subscription }).save();

        return res.status(200).json({
            message: "Subscribed successfully!"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error subscribing user"
        });
    }
};

export const unsubscribeUser = async (req, res) => {
    try {
        const { id: subscriber } = req.user;
        const { id: subscription } = req.params;

        const deletedSubscription = await Subscription.findOneAndDelete({ subscriber, subscription });

        if (!deletedSubscription) {
            return res.status(400).json({
                message: "Not subscribed to this user!"
            });
        }

        return res.status(200).json({
            message: "Unsubscribed successfully!"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error unsubscribing user"
        });
    }
};

export const getSubscribers = async (req, res) => {
    try {
        const { id: userId } = req.user;

        const subscribers = await Subscription.find(
            { subscription: userId }).select("subscriber");

        return res.status(200).json({
            subscribers
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching subscribers"
        });
    }
};

export const getSubscriptions = async (req, res) => {
    try {
        const { id: userId } = req.user;

        const subscriptions = await Subscription.find(
            { subscriber: userId }).select("subscription");

        return res.status(200).json({
            message: "Subscriptions fetched successfully!",
            subscriptions
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching subscriptions"
        });
    }
};

export const getSubscriberCount = async (req, res) => {
    try {
        const { id: userId } = req.params;

        const count = await Subscription.countDocuments({ subscription: userId });

        return res.status(200).json({
            message: "Subscriber count fetched successfully!",
            count
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching subscriber count"
        });
    }
};

export const getSubscriptionCount = async (req, res) => {
    try {
        const { id: userId } = req.params;

        const count = await Subscription.countDocuments({ subscriber: userId });

        return res.status(200).json({
            message: "Subscription count fetched successfully!",
            count
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching subscription count"
        });
    }
};
