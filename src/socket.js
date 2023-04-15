import { Server } from "socket.io";
import ProductManager from "./dao/dbManagers/productdbManager.js";
const socket = {};
socket.connect = (server) => {
    const productManager = new ProductManager();
    socket.io = new Server(server);
  
    socket.io.on("connection", async (socket) => {
      console.log(`cliente conectado`);
      console.log(`${socket.id} connected`)
      const products = await productManager.getProducts();

      socket.emit("products",products);
    });
  };
  

export default socket