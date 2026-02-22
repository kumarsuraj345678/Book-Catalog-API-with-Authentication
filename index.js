require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000

const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");

const errorHandler = require("./middleware/errorMiddleware");

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Book Catalog API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
