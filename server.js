const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");

dotenv.config();

const app = express();

// Security and performance
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(compression());

// Read form and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Public files: CSS, JavaScript, images and resume
app.use(express.static(path.join(__dirname, "public")));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const pageRoutes = require("./routes/pageRoutes");
const contactRoutes = require("./routes/contactRoutes");

app.use("/", pageRoutes);
app.use("/contact", contactRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found",
    currentPage: "",
  });
});

// Server error handler
app.use((error, req, res, next) => {
  console.error("Server Error:", error);

  res.status(500).send(
    "Something went wrong. Please try again later."
  );
});

// Server port
const PORT = process.env.PORT || 3000;

// Connect database and start server
async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error(
        "MONGODB_URI is missing from the .env file."
      );
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(
        `Portfolio is running at http://localhost:${PORT}`
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