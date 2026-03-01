require("dotenv").config();
const app = require("./app");

// importing db config and running
const connectDb = require("./config/db");

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started at port 3000");
});
connectDb();
