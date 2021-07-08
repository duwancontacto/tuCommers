import React, { useEffect, useContext, useState } from 'react'
import Breadcrumb from "../../Breadcrum/BreadCrum"
import Footer from "../../Footer/Footer"
import { Card } from "reactstrap"

import * as yup from "yup";
import { useFormik } from "formik";
import { useToasts } from 'react-toast-notifications';
import countryList from 'react-select-country-list'

import getDataFormik from "../../../utils/formik/getDataFormik"
import Input from "../../../Components/Formulario/Input"
import petition_get from "../../../utils/petitions/petition_get"
import petition_patch from "../../../utils/petitions/petition_patch"


import PersonIcon from '@material-ui/icons/Person';
import StoreIcon from '@material-ui/icons/Store';
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness';
import LoadingPage from '../../LoadingPage/LoadingPage';
import petitionError from "../../../utils/petitions/petitionError"
import ThemeContext from '../../../context/Theme/ThemeContext';
export default function ProfileContent() {

    const [loading, setLoading] = useState(false)
    const { changeTheme } = useContext(ThemeContext)

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
        ],
        theme: [
            { name: "theme.type", placeholder: "Ejem: Light", optional: true, label: "Tema de tu Tablero", type: "dropdown", dropdownOptions: [{ value: "light", label: "Claro" }, { value: "dark", label: "Oscuro" }] },
        ]
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
            setLoading(true)
            petition_patch("updateUser", { data: e })
                .then((result) => {
                    setLoading(false)
                    changeTheme(e.theme.type === "dark" ? "dark" : "default");
                    addToast("Informacion Guardada Correctamente", { appearance: 'success', autoDismiss: true, });
                })
                .catch((error) => {
                    setLoading(false)
                    petitionError(error, addToast)
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

    useEffect(() => {
        setLoading(true)
        petition_get("getDataUser")
            .then((result) => {
                setLoading(false)
                formik.setValues({
                    personalData: result.data.data.personalData ? result.data.data.personalData[0] : {},
                    bussinessData: result.data.data.bussinessData ? result.data.data.bussinessData[0] : {},
                    theme: { type: result.data.data.theme }
                })
            })
            .catch((error) => { setLoading(false); if (error.response) return addToast(error.response.data.data, { appearance: 'error', autoDismiss: true, }); })

    }, [])
    return (
        <div className="content">
            <Breadcrumb title="Tablero" subtitle="Perfil" />

            {loading ? <LoadingPage /> : <section className="row">
                <div className="col-12 ">
                    <div className="d-flex justify-content-end">
                        <button onClick={() => { formik.handleSubmit() }} className="button-custom button-blue submit-form">
                            Save
                        </button>
                    </div>
                    <Card body >
                        <div className="profile-container">
                            <div className="profile-container-icon">
                                <PersonIcon />
                            </div>
                            <h3 className="card-title">Informacion Personal</h3>
                        </div>
                        <div className={`row px-3 px-md-5 pt-5 my-4 `}>
                            {initialForm.personalData.map((element, i) => <Input formik={formik} key={i} {...element} onBlur={formik.handleBlur} onChangeInput={formik.handleChange} />)}
                        </div>

                    </Card>
                </div >
                <div className="col-12 pt-5">
                    <Card body >
                        <div className="profile-container">
                            <div className="profile-container-icon">
                                <StoreIcon />
                            </div>
                            <h3 className="card-title">Empresa</h3>
                        </div>
                        <div className={`row px-3 px-md-5 pt-5 my-4 `}>
                            {initialForm.bussinessData.map((element, i) => <Input formik={formik} key={i} {...element} onBlur={formik.handleBlur} onChangeInput={formik.handleChange} />)}
                        </div>

                    </Card>
                </div >
                <div className="col-12 pt-5">
                    <Card body >
                        <div className="profile-container">
                            <div className="profile-container-icon">
                                <SettingsBrightnessIcon />
                            </div>
                            <h3 className="card-title">Tema de la pagina</h3>
                        </div>
                        <div className={`row px-3 px-md-5 pt-5 my-4 `}>
                            {initialForm.theme.map((element, i) => <Input formik={formik} key={i} {...element} onBlur={formik.handleBlur} onChangeInput={formik.handleChange} />)}
                        </div>

                    </Card>
                </div >
            </section>}
            <Footer />
        </div>
    )
}
