const express = require("express");

const app = express();
const PORT = 3000;

const studentRoutes = require("./routes/studentRoutes");
const logger = require("./middleware/logger.js");

app.use(express.json());

app.use(logger);

app.use("/students", studentRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port",PORT);
});