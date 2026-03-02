require("dotenv").config();
const app = require("./src/app");
const connecToDB = require("./src/config/database");

const port = process.env.PORT;
connecToDB();

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
