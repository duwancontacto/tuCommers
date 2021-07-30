const Group = require("../Model/GroupModel")
const User = require("../Model/UserModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sendMail = require("../utils/sendMail")
const path = require("path")
const mustache = require("mustache")
var fs = require('fs');
const { validationResult } = require("express-validator");
exports.getListOfGroups = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(400).json({ error: true, data: "Error en la Autorizacion" });
        }


        const group = await Group.findOne({ _id: req.user.groupId })
        if (!group) return res.status(404).json({ error: true, data: "Grupo no encontrado" })

        const users = []
        group.users.map(async element => {
            users.push(User.findOne({ _id: element.userId }))
        })

        Promise.all(users).then((result) => {
            result.map(element => element.password = "Encrypted")
            return res.status(200).json({ error: false, data: { group, users: result } })
        }).catch(err => {
            return res.status(404).json({ error: true, data: "Error al encontrar un usuarios" })
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: false, data: "Error al obtener la lista de usuarios " });
    }
}



exports.sendInvitationOfGroup = async (req, res) => {



    try {

        req.body.email = req.body.email.toLowerCase();

        if (!req.user) {
            return res.status(400).json({ error: true, data: "Error en la Autorizacion" });
        }
        //View Emails Duplicates
        const findUser = await User.findOne({ email: req.body.email });
        if (findUser) {
            return res
                .status(400)
                .json({ error: true, data: "Ya Existe un usuario con este email" });
        }

        const findGroup = await Group.findOne({ _id: req.user.groupId })
        if (!findGroup) {
            return res
                .status(400)
                .json({ error: true, data: "No Existe este grupo" });
        }

        //Create User
        const user = new User({ ...req.body });

        //Update Group
        let data = { userId: user._id, role: "User", email: user.email, }
        await Group.updateOne({ _id: req.user.groupId }, { users: [...findGroup.users, data] })


        //Hash Password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);

        //Save User
        let userCreate = await user.save();
        if (!userCreate) {
            return res
                .status(400)
                .json({ error: true, data: "Error al crear el usuario" });
        }
        jwt.sign(
            { email: req.body.email, _id: user._id },
            process.env.PALABRA_SECRETA,
            { expiresIn: "1h" },
            async (error, token) => {
                if (error) throw error;

                let urlBase = req.protocol + "://" + req.get('host');
                const template = fs.readFileSync(path.join(__dirname, "../Templates/sendInvitation.html")).toString();

                let html = mustache.render(template, { link_1: urlBase, name_owner: req.user.personalData[0].names, link_2: `${urlBase}/restartPassword/?token=${token}` })
                let subject = "Invitacion a TuCommers."

                let result = await sendMail.sendMail({ email: req.body.email, subject, html, title: "Invitacion A TuCommer" })
                console.log(result)
                if (result) res.status(200).json({ error: false, data: "Solicitud Procesada Correctamente" })


            }
        );
    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({ error: true, data: "Error al enviar la invitacion" });
    }


}
exports.deleteUserOfGroup = async (req, res) => {



    try {
        if (!req.user)
            return res.status(400).json({ error: true, data: "Error en la Autorizacion" });


        const findGroup = await Group.findOne({ _id: req.user.groupId })
        if (!findGroup)
            return res.status(400).json({ error: true, data: "No Existe este grupo" });


        const findUser = findGroup.users.find(element => element.userId.equals(req.params.userId))

        if (findUser.role === "Admin") return res.status(400).json({ error: true, data: "Error, No se puede eliminar el Admin del grupo" });

        //Update Group
        const newUsers = findGroup.users.filter(element => !element.userId.equals(req.params.userId))
        const updateGroup = await Group.updateOne({ _id: req.user.groupId }, { users: newUsers })
        if (!updateGroup) return res.status(400).json({ error: true, data: "Error al eliminar el usuario" });

        //Delete User 

        const deleteUser = await User.deleteOne({ _id: req.params.userId })
        if (!deleteUser) return res.status(400).json({ error: true, data: "Error al eliminar el usuario" });

        return res.status(200).json({ error: false, data: "Usuario Eliminado" });



    } catch (error) {
        console.log(error)
        return res
            .status(500)
            .json({ error: true, data: "Error al enviar la invitacion" });
    }


}

