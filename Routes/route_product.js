const express = require(`express`);
const verifytoken = require(`../Middleware/authrization`);
const allowed_to = require(`../Middleware/AllowedTo`);
const UserRole = require(`../utility/UserRole`);
const router = express.Router();
const Controller = require(`../Controller/product`);
router.get(`/product`, verifytoken, Controller.getall_products);
router.get(
  `/product/:product_id`,
  verifytoken,
  allowed_to(UserRole.ADMIN),
  Controller.get_product
);
router.post(`/product`, Controller.increase_product);
router.patch(`/product/:product_id`, Controller.modify_product);
router.delete(
  `/product/:product_id`,
  verifytoken,
  allowed_to(UserRole.MANAGER),
  Controller.delete_product
);

module.exports = router;
