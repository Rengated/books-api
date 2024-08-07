import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const bob = await prisma.user.create({
    data: {
      email: "bob@mail.ru",
      password: await bcrypt.hash("guest1", 10),
      username: "bob",
      role: "ADMIN",
    },
  });

  const alice = await prisma.user.create({
    data: {
      email: "bob@mail.ru",
      password: await bcrypt.hash("guest2", 10),
      username: "bob",
    },
  });

  const vanda = await prisma.user.create({
    data: {
      email: "vanda@mail.ru",
      password: await bcrypt.hash("guest3", 10),
      username: "vanda",
    },
  });

  const pavel = await prisma.user.create({
    data: {
      email: "pavel@mail.ru",
      password: await bcrypt.hash("guest4", 10),
      username: "pavel",
    },
  });
  console.log({ pavel, bob, alice, vanda });

  const book1 = await prisma.book.create({
    data: {
      genres: ["Drama"],
      title: "Deadpool",
      author: "unknown",
    },
  });

  const book2 = await prisma.book.create({
    data: {
      genres: ["Mystic"],
      title: "Ghost",
      author: "Myster A.",
    },
  });
  const book3 = await prisma.book.create({
    data: {
      genres: ["Fantasy"],
      title: "Speed",
      author: "Gomel S.",
    },
  });

  const book4 = await prisma.book.create({
    data: {
      genres: ["Humor", "Comedy"],
      title: "Vanda",
      author: "Vanda A.",
    },
  });

  console.log({ book1, book2, book3, book4 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
