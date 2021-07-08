
import * as yup from "yup";
const { buildYup } = require("json-schema-to-yup");
const getData = (data) => {


    let initialValues = {}
    let validationSchema = yup.object({
        nombres: yup.string().required("Es Requerido tus Nombres "),
    })
    let formSections = data
    let parseForm = {}

    Object.keys(data).map(element => {

        //Initial Values 
        let getInputs = {}
        let getInputs2 = {}
        data[element].map(elementTwo => {
            getInputs[elementTwo.name.split(".")[1]] = "",
                getInputs2[elementTwo.name] = { type: "string", description: elementTwo.placeholder, required: true }
        })
        parseForm[element] = { type: "object", properties: { ...getInputs2 } }
        initialValues[element] = { ...getInputs }
    })
    //Validation Schema
    const schema = {

        /*    type: "object",
           title: "Person",
           description: "A person",
           properties: parseForm,
   
   
    */
        title: "Person",
        description: "A person",
        type: "object",
        properties: {

            boss: {
                type: "object",

                properties: {
                    name: {
                        type: "string",
                        notOneOf: ["Dr. evil", "bad ass"]
                    }
                }
            },
        }

    };

    const config = {
        // for error messages...
        errMessages: {
            name: {
                required: "A person must have an age"
            },
            email: {
                required: "You must enter an email address",
                format: "Not a valid email address"
            }
        }
    };

    const yupSchema = buildYup(schema, config);
    /* console.log(yupSchema) */






    return { initialValues, validationSchema, formSections }
}



export default getData