import "dotenv/config";
import app from "./src/app.js";
import connectToDb from "./src/config/data.database.js";

const port = process.env.PORT || 8080;

connectToDb();
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
