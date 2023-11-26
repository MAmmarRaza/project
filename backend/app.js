const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const productRouter = require("./routes/productRouter");
const SupplierRouter = require('./routes/supplierRouter');
const app = express();
const port = 4000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/tajir', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", () => {
  console.log("Error occurred in db connection");
});
db.once("open", () => {
  console.log("Connected");
});

app.use(cors());
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", productRouter);
app.use("/", SupplierRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
