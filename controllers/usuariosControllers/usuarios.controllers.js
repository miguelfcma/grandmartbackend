import { Usuario } from "../../models/usuariosModel/UsuarioModel.js";

export const getUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    //Verificación de existencia
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    //Validación de existencia
    if (usuarios.length === 0) {
      return res.status(404).json({ message: "No se encontraron usuarios" });
    }
    res.json(usuarios);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUsuario = async (req, res) => {
  const { nombre, apellidoPaterno, apellidoMaterno, email, sexo, fechaNacimiento, telefono, contrasena, tipoUsuario } = req.body;
  try {
    // Buscar si el usuario ya existe
    const existingUsuario = await Usuario.findOne({
      where: { email: email },
    });

    // Si el usuario no existe, crea el registro
    if (!existingUsuario) {
      const newUsuario = await Usuario.create({
        nombre, 
        apellidoPaterno,
        apellidoMaterno,
        email,
        sexo,
        fechaNacimiento,
        telefono,
        contrasena,
        tipoUsuario
      });
      res.json(newUsuario);
    } else {
      // Si el usuario ya existe, devolver un mensaje de error
      return res.status(400).json({ message: "El email ya ha sido vinculado a otro perfil!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  const { nombre, apellidoPaterno, apellidoMaterno, email, sexo, fechaNacimiento, telefono, contrasena,  tipoUsuario} = req.body; // Obtiene los nuevos valores desde el cuerpo de la solicitud
  try {
    //Verifica existencia
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "No se encontróel usuario" });
    }
    // Actualiza el registro usuario con los nuevos valores
    const updateUsuario = await usuario.update({
        nombre, 
        apellidoPaterno,
        apellidoMaterno,
        email,
        sexo,
        fechaNacimiento,
        telefono,
        contrasena,
        tipoUsuario
    });

    // Envía una respuesta exitosa
    res
      .status(200)
      .json({ updateUsuario, message: "Usuario actualizado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    //Verifica existencia
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "No se encontró el usuario" });
    }
    //realiza la eliminacion
    await usuario.destroy();
    res.json({ message: "El usuario fue eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};