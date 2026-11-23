import { RemoteProduct, LocalProduct } from "../models/index.js";

export const getProducts = async (req, res) => {
    try {
        const products = await RemoteProduct.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPriceRange = async (req, res) => {
    try {
        const products = await RemoteProduct.find({
            price: { $gte: 500, $lte: 1000 },
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getExpired = async (req, res) => {
    try {
        const products = await RemoteProduct.find({
            expiryDate: { $lt: new Date() },
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getLowStock = async (req, res) => {
    try {
        const products = await RemoteProduct.find({ quantity: { $lt: 50 } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getByFirm = async (req, res) => {
    try {
        const products = await RemoteProduct.find({ firmName: req.params.firm });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteExpired = async (req, res) => {
    try {
        const remote = await RemoteProduct.deleteMany({ expiryDate: { $lt: new Date() } });
        const local = await LocalProduct.deleteMany({ expiryDate: { $lt: new Date() } });
        res.json({
            message: "Expired products deleted",
            remoteDeleted: remote.deletedCount,
            localDeleted: local.deletedCount,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePrice = async (req, res) => {
    try {
        const filter = { firmName: req.params.firm };
        const update = { $set: { price: Number(req.body.price) } };
        const remote = await RemoteProduct.updateMany(filter, update);
        const local = await LocalProduct.updateMany(filter, update);
        res.json({
            message: "Product prices updated",
            remoteModified: remote.modifiedCount,
            localModified: local.modifiedCount,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
