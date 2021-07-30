import React, { useEffect } from 'react'

import * as yup from "yup";
import { useFormik } from "formik";
import { useToasts } from 'react-toast-notifications';
import countryList from 'react-select-country-list'
import { v4 as uuidv4 } from 'uuid';

import Input from "../../../Components/Formulario/Input"
import getDataFormik from '../../../utils/formik/getDataFormik';

import petition_patch from '../../../utils/petitions/petition_patch';
export default function GroupAdd({ modal, setModal, reloadDataContent }) {

    const { addToast } = useToasts();
    const initialForm = {
        personalData: [
            { name: "personalData.names", placeholder: "Ejem: Pedro Pablo", label: "Nombre*", type: "text" },
            { name: "personalData.lastNames", placeholder: "Ejem: Fernando Gomez", label: "Apellido*", type: "text" },
            { name: "personalData.email", placeholder: "Ejem: correo@correo.com", label: "Correo Electronico*", type: "email" },
            { name: "personalData.number", placeholder: "Ejem: +123 12345123", label: "Numero de Contacto*", type: "numberInput" },
            { name: "personalData.country", placeholder: "Ejem: Mexico", label: "Pais*", type: "dropdown", dropdownOptions: [{ value: "", label: "Selecciona " }, ...countryList().getData()] },
        ],
    }

    const formikValues = getDataFormik(initialForm)


    const formik = useFormik({
        enableReinitialize: true,
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
            e.email = e.personalData.email;
            e.password = uuidv4();
            e.registerComplete = true;
            e.role = "User"
            setModal({ ...modal, loading: true })
            return petition_patch("addUser", { data: e })
                .then((result) => {
                    addToast("Usuario Creado Correctamente", { appearance: 'success', autoDismiss: true, });
                    setModal({ ...modal, active: false, loading: false })
                    reloadDataContent()
                })
                .catch((error) => {
                    console.log(error.response);
                    addToast("Error al Crear el Usuario", { appearance: 'error', autoDismiss: true, });

                })
        },
    });


    useEffect(() => {
        if (modal.active && modal.send) {
            setModal({ ...modal, send: false })
            formik.handleSubmit()
        }
    }, [modal])


    //Send Toast alert for validator Schema 
    useEffect(() => {
        if (formik.errors && formik.isSubmitting) Object.keys(formik.errors).map((element, i) => {
            Object.keys(formik.errors[element]).map(elementTwo => {
                addToast(formik.errors[element][elementTwo], { appearance: 'error', autoDismiss: true, })
            })
        })
    }, [formik.isSubmitting, formik.errors])

    return (
        <div className="row">
            {initialForm.personalData.map((element, i) => <Input size="12" formik={formik} key={i} {...element} onBlur={formik.handleBlur} onChangeInput={formik.handleChange} />)}
        </div>
    )
}
