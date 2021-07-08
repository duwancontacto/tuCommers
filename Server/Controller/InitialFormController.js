const { validationResult } = require("express-validator");
const User = require("../Model/UserModel")

exports.setInitialForm = async (req, res) => {
  const errors = validationResult(req);

  //View Error of Body
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: true, data: errors.array() });
  }


  try {

    let { personalData, bussinessData } = req.body

    if (!req.user) {
      return res.status(400).json({ error: true, data: "Error en la Autorizacion" });
    }


    const findUser = await User.findOne({ _id: req.user.id })

    if (!findUser) {
      return res.status(404).json({ error: true, data: "Usuario no Encontrado" });
    }

    if (findUser.registerComplete) {
      return res.status(500).json({ error: true, data: "Formulario ya creado" });
    }

    const userUpdate = await User.updateOne({ _id: req.user.id }, { registerComplete: true, personalData, bussinessData })

    if (!userUpdate) throw "Error"


    return res.status(200).json({ error: false, data: "Informacion Actualizada Correctamente", });


  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: false, data: "Error al actualizar la informacion" });
  }
};
