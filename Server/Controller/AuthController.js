const { validationResult } = require("express-validator");
const User = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail")
exports.getUser = async (req, res) => {
  const errors = validationResult(req);

  //View Error of Body
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: true, data: errors.array() });
  }

  try {

    req.body.email = req.body.email.toLowerCase();

    //View Emails Duplicates
    const findUser = await User.findOne({ email: req.body.email });

    if (!findUser) {
      return res.status(400).json({ error: true, data: "Credenciales Invalidas" });
    }

    let { email, registerComplete, _id, personalData, BussinessData } = findUser

    //View equals password
    if (!bcrypt.compareSync(req.body.password, findUser.password)) {
      return res.status(400).json({ error: true, data: "Contrasena invalidad" });
    }

    //Generate Token
    jwt.sign(
      { email, id: _id, registerComplete, personalData, BussinessData },
      process.env.PALABRA_SECRETA,
      { expiresIn: "2h" },
      (error, token) => {
        if (error) throw error;
        return res
          .status(200)
          .json({
            error: false,
            data: { token, ...jwt.verify(token, process.env.PALABRA_SECRETA) },
          });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: false, data: "Error al buscar el usuario" });
  }
};

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);

  //View Error of Body
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: true, data: errors.array() });
  }

  try {

    req.body.email = req.body.email.toLowerCase();

    //View Emails Duplicates
    const findUser = await User.findOne({ email: req.body.email });
    if (findUser) {
      return res
        .status(400)
        .json({ error: true, data: "Ya Existe un usuario con este email" });
    }

    //Create User
    const user = new User({ ...req.body, personalData: {}, bussinessData: {} });

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    //Save User
    let userCreate = await user.save();


    //Generate Token
    jwt.sign(
      { email: req.body.email, id: userCreate._id, registerComplete: false, personalData: {}, BussinessData: {} },
      process.env.PALABRA_SECRETA,
      { expiresIn: "2h" },
      (error, token) => {
        if (error) throw error;
        return res
          .status(200)
          .json({
            error: false,
            data: { token, ...jwt.verify(token, process.env.PALABRA_SECRETA) },
          });
      }
    );

  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, data: "Error al registrar un usuario" });
  }
};


exports.forgotPassword = async (req, res) => {

  const errors = validationResult(req);

  //View Error of Body
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: true, data: errors.array() });
  }

  try {

    req.body.email = req.body.email.toLowerCase();
    let { email } = req.body

    //Validate User
    const findUser = await User.findOne({ email: req.body.email });
    if (!findUser) return res.status(404).json({ error: false, data: "No existe un Usuario con este Email" })

    jwt.sign(
      { email: req.body.email, id: findUser._id },
      process.env.PALABRA_SECRETA,
      { expiresIn: "1h" },
      async (error, token) => {
        if (error) throw error;


        let urlBase = req.protocol + "://" + req.get('host');

        let subject = "Recupera Tu Contraseña de TuCommers"
        let html = `<a href="${urlBase}/restartPassword/?token=${token}">Restart Password</a>`

        let result = await sendMail.sendMail({ email, subject, html })
        if (result) res.status(200).json({ error: false, data: "Solicitud Procesada Correctamente" })

      }
    );
  } catch (error) {
    res.status(400).json({ error: true, data: "Error al gestionar tu solicitud" });
  }
}

exports.restardPassword = async (req, res) => {

  const errors = validationResult(req);

  //View Error of Body
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: true, data: errors.array() });
  }


  try {

    let { password } = req.body

    if (!req.user) {
      return res.status(400).json({ error: true, data: "Error en la Autorizacion" });
    }

    const findUser = await User.findOne({ _id: req.user.id })

    if (!findUser) {
      return res.status(404).json({ error: true, data: "Usuario no Encontrado" });
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const userUpdate = await User.updateOne({ _id: req.user.id }, { password })

    if (!userUpdate) throw "Error"

    return res.status(200).json({ error: false, data: "Credenciales Actualizadas Correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: false, data: "Error al actualizar la informacion" });

  }

}
