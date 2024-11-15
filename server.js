const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require('cors');

const { join } = require('path');

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes")

const app = express();
const PORT = 4001;

mongoose
    .connect("mongodb://localhost:27017/make-my-neon-DB")
    .then(() => console.log("MongoDB Connected"))
    .catch(() => console.log("MongoDB Error"));


const corsOptions = {
    origin: '*', // Restrict to this domain
    // methods: ['GET', 'POST', 'PUT'], // Only allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};
app.use(cors(corsOptions));
app.options('*', cors());

app.use(
    fileUpload()
);

app.use((err, req, res, next) => {
    res.json({ err })
});

app.use('/uploads', express.static(join(__dirname, 'uploads')));

app.use((req, res, next) => {
    req.body = {
        ...req.body,
        ...req.files,
    };
    next();
});

app.use(cookieParser());

app.use(express.json());

app.use("/", userRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
    console.log(`server start at port ${PORT}`);
});
