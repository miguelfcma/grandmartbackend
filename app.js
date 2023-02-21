import express from "express";

import usuariosRoutes from "./routes/usuariosRoutes/usuarios.routes.js";
import categoriaRoutes from "./routes/categoriasRoutes/categorias.routes.js";
import productoRoutes from "./routes/productosRoutes/productos.routes.js";
const app = express();

//middlewares
//esto permitira que cada vez que se envia algo al servidor en formato json
//el servidor podra leerlo e interpretarlo guardandolo en req.body
app.use(express.json());

app.use(usuariosRoutes);
app.use(categoriaRoutes);
app.use(productoRoutes);

export default app;
