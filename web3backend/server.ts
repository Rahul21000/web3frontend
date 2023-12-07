import express from "express";
// import bodyparser from "body-parser";
import routes from "./src/route/routes";
import connect from "./src/util/connect";
import config from "config";
import cors from "cors";

const port = config.get<number>("port");

// app
const app = express();


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, async () => {
  console.log(`sever is running on port ${port}`);
  await routes(app);
  await connect();
});
