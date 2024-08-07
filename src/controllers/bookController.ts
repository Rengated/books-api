import express, { Router, Request, Response } from "express";
import BookService from "../services/bookService.js";
import { adminMiddleware, jwtMiddleware } from "../middleware/index.js";
import { Book } from "@prisma/client";

class BookController {
  bookService: BookService;
  router: Router;

  constructor() {
    this.bookService = new BookService();
    this.router = express.Router();
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get("/", this.getBooks);
    this.router.post("/", [jwtMiddleware, adminMiddleware], this.addBook);
    this.router.get("/:id", this.getBookById);
    this.router.put("/:id", [jwtMiddleware, adminMiddleware], this.updateBook);
    this.router.delete("/:id", [jwtMiddleware, adminMiddleware], this.deleteBook);
  }

  addBook = async (req: Request, res: Response) => {
    const book: Book = req.body;
    if (book.author && book.genres.length && book.publicationDate && book.title) {
      return res.send(await this.bookService.addBook(book)).status(201);
    }
    return res.send({ status: "provide valid data" }).status(422);
  };

  getBooks = async (req: Request, res: Response) => {
    return res.send(await this.bookService.getBooks()).status(200);
  };
  getBookById = async (req: Request, res: Response) => {
    const bookId = Number(req.params.id);
    if (!bookId) {
      return res.send({ status: "no book selected" }).status(422);
    }
    return res.send(await this.bookService.getBook(bookId)).status(200);
  };

  updateBook = async (req: Request, res: Response) => {
    const bookId = Number(req.params.id);
    const bookData = req.body;
    if (!bookId) {
      return res.send({ status: "no book selected" }).status(422);
    }
    return res.send(await this.bookService.updateBook(bookId, bookData)).status(200);
  };

  deleteBook = async (req: Request, res: Response) => {
    const bookId = Number(req.params.id);
    const bookData = req.body;
    if (!bookId) {
      return res.send({ status: "no book selected" }).status(422);
    }
    return res.send(await this.bookService.deleteBook(bookId)).status(200);
  };

  getRouter() {
    return this.router;
  }
}

export default BookController;
