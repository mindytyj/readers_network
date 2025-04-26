const express = require("express");
const router = express.Router();
const ordersCtrl = require("../../controllers/api/orders");

router.get("/:userId", ordersCtrl.getOrders);
router.get("/:bookId/:userId", ordersCtrl.getOrderHistory);
router.post("/payment/:userId", ordersCtrl.addToOrder);

module.exports = router;
