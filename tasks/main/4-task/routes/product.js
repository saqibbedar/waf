import express from "express";
import {
    getProducts,
    getPriceRange,
    getExpired,
    getLowStock,
    getByFirm,
    deleteExpired,
    updatePrice,
} from "../controllers/index.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/price-range", getPriceRange);
router.get("/expired", getExpired);
router.get("/low-stock", getLowStock);
router.get("/firm/:firm", getByFirm);
router.delete("/expired", deleteExpired);
router.patch("/firm/:firm/price", updatePrice);

export default router;
