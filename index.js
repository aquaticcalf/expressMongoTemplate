const app = require("./app.js");
const mongoose = require("mongoose");
const { PORT, mongoDBURL } = require("./config.js");

mongoose.connect(mongoDBURL)
.then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
        console.log(`listening:${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});