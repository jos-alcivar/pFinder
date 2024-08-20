import express from "express";
import cors from "cors";
import router from "./src/routes/task.routes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
