const express = require("express");
const { body, validationResult } = require("express-validator");
const Contact = require("../models/Contact");

const router = express.Router();

router.post(
  "/",

  [
    body("name")
      .trim()
      .isLength({ min: 2, max: 60 })
      .withMessage("Please enter a valid name."),

    body("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("Please enter a valid email address."),

    body("message")
      .trim()
      .isLength({ min: 10, max: 1500 })
      .withMessage(
        "Message must contain between 10 and 1500 characters."
      ),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessage = errors
          .array()
          .map((error) => error.msg)
          .join(" ");

        return res.redirect(
          `/contact?error=${encodeURIComponent(errorMessage)}`
        );
      }

      const { name, email, message } = req.body;

      await Contact.create({
        name,
        email,
        message,
      });

      return res.redirect("/contact?success=true");
    } catch (error) {
      console.error("Contact form error:", error);

      return res.redirect(
        `/contact?error=${encodeURIComponent(
          "Your message could not be sent. Please try again."
        )}`
      );
    }
  }
);

module.exports = router;