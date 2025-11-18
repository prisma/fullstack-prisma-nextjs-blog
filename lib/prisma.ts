import { PrismaClient } from "../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more: 
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    adapter,
  })
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      adapter,
    })
  }
  prisma = global.prisma
}
export default prisma