const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authValidation = require("../middleware/authMiddleware");

// User Login
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      // Create a token
      const token = jwt.sign({ email: adminEmail, role: 'admin' }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set secure based on environment
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Set sameSite based on environment
        maxAge: 3600000 // 1 hour in milliseconds
      }).json({ message: "Logged in successfully", role: 'admin' });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Validate Token
router.get("/validate", authValidation, (req, res) => {
  res.sendStatus(200);
});

// User Logout
router.post("/logout", (req, res) => {
  // In a real app, you might add the token to a blacklist
  res.status(200).json({ message: "Logged out successfully" });
});


module.exports = router;