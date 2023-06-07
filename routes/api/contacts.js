const express = require("express");

const {
  Contact,
  addSchema,
  updateSchema,
  updateFavoriteSchema,
} = require("../../models/contact");

const { isValidId, authenticate } = require("../../middlewares");

const { HttpError } = require("../../helpers");

const router = express.Router();

router.get("/", authenticate, async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", authenticate, isValidId, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", authenticate, isValidId, async (req, res, next) => {
  try {
    const { error } = updateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  async (req, res, next) => {
    try {
      const { error } = updateFavoriteSchema.validate(req.body);
      if (error) {
        throw HttpError(400, "missing field favorite");
      }
      const { contactId } = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {
        new: true,
      });

      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await Contact.findByIdAndDelete(contactId);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json({
        message: "Delete success",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
