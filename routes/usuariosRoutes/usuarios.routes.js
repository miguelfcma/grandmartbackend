import { Router } from "express";

import { getUsuario, getUsuarios,deleteUsuario, createUsuario, updateUsuario } from "../../controllers/usuariosControllers/usuarios.controllers.js";

const router = Router();

router.get("/usuarios", getUsuarios);

router.get("/usuarios/:id", getUsuario);

router.post("/usuarios", createUsuario);

router.put("/usuarios/:id", updateUsuario);

router.delete("/usuarios/:id", deleteUsuario);

export default router;
