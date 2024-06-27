const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 5000;

app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

const userRouter = require("./routes/api/users");
app.use("/api/users", userRouter);
const profileRouter = require("./routes/api/profile");
app.use("/api/profile", profileRouter);

app.listen(port, () => {
    console.log(`server is on port ${port}`);
});
