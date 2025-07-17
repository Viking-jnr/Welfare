const express = require("express");
const cors = require("cors");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome to the Welfare Backend API");
});

const fs = require('fs');
const path = require("path");
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}



const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
