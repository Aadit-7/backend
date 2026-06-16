import "dotenv/config";
import app from "./src/app.js";
import connectToDB from "./src/config/data.database.js";

const port = process.env.PORT || 8080;

connectToDB();
app.listen(port, () => {
  console.log(`Server is running on the port: ${port}`);
});
