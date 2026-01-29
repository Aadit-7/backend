const app = require("./src/app");
const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(
      "mongodb+srv://aadityadav121_db_user:x8bEwoSEr2e528VQ@cluster0.wsgvw2w.mongodb.net/day-6",
    )
    .then(() => {
      console.log("Connnected to database");
    });
}

connectToDb();

app.listen(3000, (req, res) => {
  console.log("Server is listening at port 3000");
});
