import React, { useEffect, useState } from 'react'
import Input from "./Input"
import * as yup from "yup";
import { useFormik } from "formik";
import { useToasts } from 'react-toast-notifications';
import { useRouter } from "next/router";
import getDataFormik from "../../utils/formik/getDataFormik"
import countryList from 'react-select-country-list'
import Checkmark from '../Checkmark/Checkmark';
import petition_patch from '../../utils/petitions/petition_patch';
export default function Steps({ activeStep, setActiveStep, checkMark, setCheckMark }) {


    const router = useRouter()
    const { addToast } = useToasts();
    const initialForm = {
        personalData: [
            { name: "personalData.names", placeholder: "Ejem: Pedro Pablo", label: "Nombre*", type: "text" },
            { name: "personalData.lastNames", placeholder: "Ejem: Fernando Gomez", label: "Apellido*", type: "text" },
            { name: "personalData.email", placeholder: "Ejem: correo@correo.com", label: "Correo Electronico*", type: "email" },
            { name: "personalData.number", placeholder: "Ejem: +123 12345123", label: "Numero de Contacto*", type: "numberInput" },
            { name: "personalData.country", placeholder: "Ejem: Mexico", label: "Pais*", type: "dropdown", dropdownOptions: [{ value: "", label: "Selecciona " }, ...countryList().getData()] },
            { name: "personalData.sex", placeholder: "Ejem: Masculino", optional: true, label: "Genero", type: "dropdown", dropdownOptions: [{ value: "", label: "Selecciona " }, { value: "masculino", label: "Masculino" }, { value: "femenino", label: "Femenino" }, { value: "otros", label: "Otros" }] },
            { name: "personalData.direction", placeholder: "Ejem: Venezuela", optional: true, label: "Direccion", type: "directionInput" },
        ],
        bussinessData: [
            { name: "bussinessData.bussinessName", placeholder: "Ejem: TuCommers", optional: true, label: "Nombre de tu Negocio", type: "text" },
            { name: "bussinessData.sector", placeholder: "Ejem: Prendas", optional: true, label: "Sector Empresarial", type: "text" },
            { name: "bussinessData.bussinessDirection", placeholder: "Ejem: Venezuela", optional: true, label: "Direccion de tu Negocio", type: "text" },
        ]
    }
    const formikValues = getDataFormik(initialForm)
    const formik = useFormik({
        initialValues: formikValues.initialValues,
        validationSchema: yup.object({
            personalData: yup.object({
                names: yup.string().required("Es Requerido tu Nombre "),
                lastNames: yup.string().required("Es Requerido tu Apellido "),
                email: yup.string().email("El Email no es Valido").required("Es Requerido tu Email "),
                number: yup.string().required("Es Requerido tu Numero de Contacto "),
                country: yup.string().required("Es Requerido tu Pais "),
            }),
        }),
        onSubmit: (e) => {
            setActiveStep(activeStep + 1)

            return petition_patch("formUser", { data: e })
                .then((result) => {
                    addToast("Informacion Guardada Correctamente", { appearance: 'success', autoDismiss: true, });
                    setCheckMark(true)
                })
                .catch((error) => {
                    console.log(error.response);
                    addToast("Error al guardar el formulario", { appearance: 'error', autoDismiss: true, });
                    setActiveStep(activeStep - 1)
                })
        },
    });


    //Send Toast alert for validator Schema 
    useEffect(() => {
        if (formik.errors && formik.isSubmitting) Object.keys(formik.errors).map((element, i) => {
            Object.keys(formik.errors[element]).map(elementTwo => {
                addToast(formik.errors[element][elementTwo], { appearance: 'error', autoDismiss: true, })
                return setActiveStep(i)
            })
        })
    }, [formik.isSubmitting, formik.errors])


    const handleSubmit = () => {
        if (activeStep < 1) return setActiveStep(activeStep + 1)
        formik.handleSubmit()
    }

    const handleBack = () => { setActiveStep(activeStep - 1) }

    const handleToDashboard = () => { router.push("/dashboard") }

    return (

        <div>
            {/* Step one  */}
            <div className={`row px-3 px-md-5 ${activeStep === 0 ? "d-flex" : "d-none"}`}>
                <h3 className="my-4 subtitle-form" style={{}}>Informacion Basica:</h3>
                {initialForm.personalData.map((element, i) => <Input formik={formik} key={i} {...element} onBlur={formik.handleBlur} value={formik.values[element.name]} onChangeInput={formik.handleChange} />)}
            </div>


            {/* Step Two  */}
            <div className={`row px-3 px-md-5 ${activeStep === 1 ? "d-flex" : "d-none"}`}>
                <h3 className="my-4 subtitle-form" style={{}}>Negocio:</h3>
                {initialForm.bussinessData.map((element, i) => <Input formik={formik} key={i} {...element} onBlur={formik.handleBlur} value={formik.values[element.name]} onChangeInput={formik.handleChange} />)}
            </div>


            {/* Step three  */}
            <div className={`mt-5 pt-5 ${activeStep === 2 ? "d-block" : "d-none"}`}><Checkmark loading={checkMark} /> </div>


            {/* Buttons of Submit */}
            <div className="container-submit">
                {activeStep > 0 && activeStep < 2 && <button className="button-custom button-outline submit-form" onClick={handleBack} >  Regresar  </button>}
                {activeStep < 2 && <button className="button-custom button-blue submit-form" onClick={handleSubmit} > Siguiente</button>}
                {checkMark && <button className="button-custom button-blue submit-form" onClick={handleToDashboard} > Ir a tu tablero </button>}
            </div>

        </div>

    )
}
