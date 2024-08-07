import express from "express";
import BookController from "./controllers/bookController.js";
import UserController from "./controllers/userController.js";
import "dotenv/config";

const bookController = new BookController();
const userController = new UserController();

const app = express();
app.use(express.json());
app.use("/books", bookController.getRouter());
app.use("/users", userController.getRouter());

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

process.on("uncaughtException", (err) => {
  console.log(err);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
});
