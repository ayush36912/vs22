const express = require("express");
const compression = require("compression");
const path = require("path");
const app = express();
app.use(compression());
app.use(express.static(path.join(__dirname, "build")));
app.get("*", function (req, res) {
    console.log(path.join(__dirname, "build", "index.html"));
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
