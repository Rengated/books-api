import { Book, PrismaClient } from "@prisma/client";
import prismaClient from "../prisma/client.js";

class BookRepository {
  prisma: PrismaClient;
  constructor() {
    this.prisma = prismaClient;
  }

  async getBooks() {
    const books = await this.prisma.book.findMany();
    return books;
  }

  async getBook(bookId: number) {
    const book = await this.prisma.book.findMany({
      where: {
        id: bookId,
      },
    });
    return book;
  }

  async addBook(bookData: Omit<Book, "id">) {
    const book = await this.prisma.book.create({
      data: {
        ...bookData,
      },
    });
    return book;
  }

  async updateBook(bookId: number, fields: Partial<Omit<Book, "id">>) {
    const updatedBook = await this.prisma.book.update({
      where: { id: bookId },
      data: { ...fields },
    });
    return updatedBook;
  }

  async deleteBook(bookId: number) {
    const deletedBook = await this.prisma.book.delete({
      where: { id: bookId },
    });
  }
}

export default BookRepository;
