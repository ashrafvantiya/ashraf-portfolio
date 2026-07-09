const express = require("express");

const router = express.Router();

// Home page
router.get("/", (req, res) => {
  res.render("home", {
    title: "Home | Ashraf Vantiya",
    currentPage: "home",
  });
});

// About page
router.get("/about", (req, res) => {
  res.render("about", {
    title: "About | Ashraf Vantiya",
    currentPage: "about",
  });
});

// Education page
router.get("/education", (req, res) => {
  res.render("education", {
    title: "Education | Ashraf Vantiya",
    currentPage: "education",
  });
});

// Experience page
router.get("/experience", (req, res) => {
  res.render("experience", {
    title: "Experience | Ashraf Vantiya",
    currentPage: "experience",
  });
});

// Projects page
router.get("/projects", (req, res) => {
  res.render("projects", {
    title: "Projects | Ashraf Vantiya",
    currentPage: "projects",
  });
});

// Skills page
router.get("/skills", (req, res) => {
  res.render("skills", {
    title: "Skills | Ashraf Vantiya",
    currentPage: "skills",
  });
});

// Certificates page
router.get("/certificates", (req, res) => {
  res.render("certificates", {
    title: "Certificates | Ashraf Vantiya",
    currentPage: "certificates",
  });
});

// Contact page
router.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact | Ashraf Vantiya",
    currentPage: "contact",
    success: req.query.success === "true",
    error: req.query.error || "",
  });
});

module.exports = router;