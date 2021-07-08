const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (authHeader) {
    try {
      const token = authHeader;
      const user = jwt.verify(token, process.env.PALABRA_SECRETA);
      req.user = user;
    } catch (error) {
      res.status(400).json({error: true, data: "Error en la autentificacion"});
      console.log(error);
    }
  }
  return next();
};
