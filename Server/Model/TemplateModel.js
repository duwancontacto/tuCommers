import mongoose from "mongoose"


const TemplateSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    urlImg: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    type: {
        type: String,
        default: ""
    },

    formData: {
        type: Array,
        default: {}
    },

    register: {
        type: Date,
        default: Date.now(),
    },
})


export default mongoose.model("Template", TemplateSchema)