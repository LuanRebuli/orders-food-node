const express = require("express");
const uuid = require("uuid");
const cors = require("cors");

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());

const orders = [];

app.get("/orders", (request, response) => {
  return response.json(orders);
});

app.post("/orders", (request, response) => {
  const { name, address, order } = request.body;

  const completOrder = { id: uuid.v4(), name, address, order };
  orders.push(completOrder);

  return response.status(201).json(completOrder);
});

app.put("/orders/:id", (request, response) => {
  const { id } = request.params;
  const { name, address, order } = request.body;

  const updateOrder = { id, name, address, order };

  const findId = orders.findIndex((completOrder) => completOrder.id === id);

  if (findId < 0) {
    return response.status(404).json({ message: "User not found" });
  }

  orders[findId] = updateOrder;

  return response.json(updateOrder);
});

app.delete("/orders/:id", (request, response) => {
  const { id } = request.params;
  const index = orders.findIndex((order) => order.id === id);

  if (index < 0) {
    return response.status(404).json({ message: "Order not found" });
  }

  orders.splice(index, 1);

  return response.status(204).json();
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
