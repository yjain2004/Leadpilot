const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// importing lead.routes 
const leadRoutes = require("./routes/lead.routes");

//importing auth routes
const authRoutes = require("./routes/admin/auth.routes");

app.use(cookieParser());
app.use(express.json());

//configuring dotenv removed, now in server.js

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use("/api/leads", leadRoutes);
app.use("/api/admin", authRoutes);

module.exports = app;
