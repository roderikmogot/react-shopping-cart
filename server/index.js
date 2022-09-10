const PrismaClient = require("@prisma/client").PrismaClient;
const express = require("express");
const cors = require("cors");
const PORT = 3030;

const prisma = new PrismaClient();
const app = express();

// Built-in middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// First route
app.get("/", cors(), async (req, res) => {
  res.send("Welcome to React-Shopping-Cart services!");
});

app.post("/api/addCart", cors(), async (req, res) => {
  const { cart } = req.body;
  for (let i = 0; i < 10000; i++) {
    await prisma.cart.create({
      data: {
        item: JSON.stringify(cart),
      },
    });
    // res.status(200).json(result);
  }
  
});

app.get("/api/showCart", cors(), async (req, res) => {
  const result = await prisma.cart.findMany();
  res.status(200).json(result);
});

const server = app.listen(PORT);
