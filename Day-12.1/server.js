const app = require("./src/app.js");
const connectToDb = require("./src/config/database");

const port = process.env.PORT;

connectToDb();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
