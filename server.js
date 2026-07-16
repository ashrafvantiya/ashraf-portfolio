const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");

dotenv.config();

const app = express();

// =======================
// Security
// =======================

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(compression());

// =======================
// Body Parser
// =======================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// =======================
// Static Files
// =======================

app.use(express.static(path.join(__dirname, "public")));

// =======================
// SEO Headers
// =======================

app.use((req, res, next) => {
  res.setHeader("X-Robots-Tag", "index, follow");
  res.locals.siteName = "Ashraf Vantiya";
  res.locals.siteUrl =
    "https://ashraf-portfolio-05ov.onrender.com";

  next();
});

// =======================
// View Engine
// =======================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// =======================
// Routes
// =======================

const pageRoutes = require("./routes/pageRoutes");
const contactRoutes = require("./routes/contactRoutes");

app.use("/", pageRoutes);
app.use("/contact", contactRoutes);

// =======================
// 404 Page
// =======================

app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 | Page Not Found",
    currentPage: "",
  });
});

// =======================
// Error Handler
// =======================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).send(
    "Internal Server Error"
  );
});

// =======================
// Port
// =======================

const PORT =
  process.env.PORT || 3000;

// =======================
// Database + Server
// =======================

async function startServer() {

  try {

    if (!process.env.MONGODB_URI) {

      throw new Error(
        "MONGODB_URI is missing from .env"
      );

    }

    await mongoose.connect(
      process.env.MONGODB_URI
    );

    console.log(
      "✅ MongoDB Connected Successfully"
    );

    app.listen(PORT, () => {

      console.log(
        `🚀 Server running on http://localhost:${PORT}`
      );

    });

  } catch (error) {

    console.error(
      "Application could not start:",
      error.message
    );

    process.exit(1);

  }

}

startServer();