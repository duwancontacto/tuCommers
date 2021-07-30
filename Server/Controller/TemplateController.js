import TemplateModel from "../Model/TemplateModel"
import imageConfig from "../utils/imageConfig"
import { validationResult } from "express-validator";
const getTemplate = async (req, res) => {
    try {

        /* if (!req.user || req.user.role !== "SuperAdmin") {
            return res.status(400).json({ error: true, data: "Error en la Autorizacion" });
        } */

        const allTemplates = await TemplateModel.find()

        if (!allTemplates) return res.status(400).json({ error: true, data: "Error al obtener la lista de templates" });

        return res.status(200).json({ error: false, data: allTemplates })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: false, data: "Error al obtener la lista de templates " });
    }

}
const getTemplateById = async (req, res) => {
    try {

        /*  if (!req.user || req.user.role !== "SuperAdmin") {
             return res.status(400).json({ error: true, data: "Error en la Autorizacion" });
         } */

        const allTemplates = await TemplateModel.findOne({ _id: req.params.id })

        if (!allTemplates) return res.status(400).json({ error: true, data: "Error al obtener la lista de templates" });

        return res.status(200).json({ error: false, data: allTemplates })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: false, data: "Error al obtener la lista de templates " });
    }


}
const setTemplate = async (req, res) => {

    const { img } = req.files

    //View Error of Body and Image
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({ error: true, data: errors.array() });
    if (!img) return res.status(400).json({ error: true, data: { msg: "Se Requiere una imagen", param: "img" } });

    try {

        /* if (!req.user || req.user.role !== "SuperAdmin") {
            return res.status(400).json({ error: true, data: "Error en la Autorizacion" });
        } */

        //Upload Image en Gallery
        req.body.urlImg = await imageConfig.addImages(img)

        const template = new TemplateModel(req.body)
        const saveTemplate = await template.save()
        if (!saveTemplate) return res.status(400).json({ error: true, data: "Error al guardar el template" });

        res.status(200).json({ error: false, data: "Template creada correctamente" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ data: "Error en la subida" })
    }
}
const deleteTemplate = async (req, res) => {
    try {

        if (!req.user || req.user.role !== "SuperAdmin") {
            return res.status(400).json({ error: true, data: "Error en la Autorizacion" });
        }

        const allTemplates = await TemplateModel.deleteOne({ _id: req.params.id })

        if (!allTemplates) return res.status(400).json({ error: true, data: "Error el eliminar el templates" });

        return res.status(200).json({ error: false, data: "Template eliminado" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: false, data: "Error al eliminar el templates " });
    }

}

const editTemplate = (req, res) => {
    res.status(200).json({ data: "edit" })

}



export default { getTemplate, setTemplate, deleteTemplate, getTemplateById, editTemplate }