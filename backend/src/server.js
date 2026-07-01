import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import dotenv from "dotenv";
import session from "express-session";

import passport from "./config/passport.js";

import internshipRoutes from "./routes/internshipRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/adminRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";

import { errorHandler } from "./middleware/error.middleware.js";
import { notFound } from "./middleware/notFound.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Static files
app.use("/uploads", express.static("uploads"));

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false,
  })
);

// CORS Configuration
// ================= CORS =================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",

  // Production Frontend
  "https://tec-tha-neon.vercel.app",
  "https://tec-tha-virid.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("🌍 Request Origin:", origin);

    // Allow Postman, mobile apps, server-to-server requests
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("❌ Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],
};

app.use(cors(corsOptions));

// Handle Preflight Requests
app.options("*", cors(corsOptions));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

app.use(limiter);

// Body Parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Session
app.use(
  session({
    secret: process.env.JWT_ACCESS_SECRET || "google-auth-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

// Passport
app.use(passport.initialize());

// Health Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TecTha Backend Running Successfully 🚀",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/admin", adminRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});

export default app;