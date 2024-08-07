import { Book } from "@prisma/client";
import BookRepository from "../repositories/bookRepository.js";

class BookService {
  bookRepository: BookRepository;
  constructor() {
    this.bookRepository = new BookRepository();
  }

  async addBook(bookData: Omit<Book, "id">) {
    return await this.bookRepository.addBook(bookData);
  }

  async getBooks() {
    return await this.bookRepository.getBooks();
  }

  async getBook(bookId: number) {
    return await this.bookRepository.getBook(bookId);
  }

  async updateBook(bookdId: number, fields: Omit<Book, "id">) {
    return await this.bookRepository.updateBook(bookdId, fields);
  }

  async deleteBook(bookdId: number) {
    return await this.bookRepository.deleteBook(bookdId);
  }
}

export default BookService;
