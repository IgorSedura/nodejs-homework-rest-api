const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Igor:JwdOrg5Y5QPi5uP6@cluster0.5ys73xb.mongodb.net/contacts_reader?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
