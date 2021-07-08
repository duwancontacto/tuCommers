const { validationResult } = require("express-validator");
const User = require("../Model/UserModel")

exports.getDataUser = async (req, res) => {

    try {
        if (!req.user) {
            return res.status(400).json({ error: true, data: "Error en la Autorizacion" });
        }

        const findUser = await User.findOne({ _id: req.user.id })

        if (!findUser) {
            return res.status(404).json({ error: true, data: "Usuario no Encontrado" });
        }

        return res.status(200).json({ error: false, data: findUser })

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: false, data: "Error al buscar el Registro" });
    }

}


exports.updateDataUser = async (req, res) => {

    const errors = validationResult(req);

    //View Error of Body
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: true, data: errors.array() });
    }
    try {
        let { personalData, bussinessData, theme } = req.body

        if (!req.user) {
            return res.status(400).json({ error: true, data: "Error en la Autorizacion" });
        }



        const userUpdate = await User.updateOne({ _id: req.user.id }, { personalData, bussinessData, theme: theme.type })

        if (!userUpdate) {
            return res.status(404).json({ error: true, data: "Usuario no Actualizado" });
        }

        return res.status(200).json({ error: false, data: userUpdate })

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: false, data: "Error al Actualizar el usuario " });
    }
}