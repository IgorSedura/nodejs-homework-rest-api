const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.userRegisterSchema),
  ctrl.register
);

router.post("/login", validateBody(schemas.userLoginSchema), ctrl.login);

module.exports = router;
