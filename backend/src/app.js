const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.set('trust proxy', 1);

// importing lead.routes 
const leadRoutes = require("./routes/lead.routes");

//importing auth routes
const authRoutes = require("./routes/admin/auth.routes");
app.use(cookieParser());
app.use(express.json());

//configuring dotenv removed, now in server.js

const cors = require('cors');
app.use(cors({ origin: 'https://leadpilot-inky.vercel.app', credentials: true }));

app.use("/api/leads", leadRoutes);
app.use("/api/admin", authRoutes);

module.exports = app;
