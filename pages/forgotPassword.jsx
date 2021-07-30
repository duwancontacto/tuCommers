import React, { useEffect, useState } from "react";

import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import ReactLoading from "react-loading"
import petition_post from "../utils/petitions/petition_post";
import { useToasts } from 'react-toast-notifications';
import petitionError from "../utils/petitions/petitionError";


export default function ForgotPassword() {
    const router = useRouter();
    const { addToast } = useToasts();

    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: "",
        },

        validationSchema: yup.object({
            email: yup.string().email("El Email no es Valido").required("Es Requerido el Email"),

        }),

        onSubmit: (e) => {
            setLoading(true)
            return petition_post("forgotPassword", { data: { email: e.email } })
                .then((result) => {
                    setLoading(false);
                    addToast("Solicitud Procesada, Revisa tu correo.", { appearance: 'success', autoDismiss: true, });
                })
                .catch((error) => {
                    setLoading(false);
                    petitionError(error, addToast)
                })
        },
    });


    useEffect(() => {
        if (formik.errors && formik.isSubmitting) Object.keys(formik.errors).map(element => addToast(formik.errors[element], { appearance: 'error', autoDismiss: true, }))
    }, [formik.isSubmitting, formik.errors])

    return (
        <div className="login" >
            <div className="container-form">
                <div
                    className="title"
                    onClick={() => {
                        router.push("/");
                    }}
                >
                    TuCommers
                </div>
                {/*   <ThemeButton /> */}
                <h4 className="mt-5 pt-4">Recupera tu Contraseña</h4>
                <p>Te enviaremos un enlace a tu correo electronico para que puedas restaurar tu Contraseña.</p>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="email"
                        id="email"
                        component="input"
                        placeholder="EMAIL"
                        className={`form-control ${formik.errors.email && formik.touched.email && "form-control-error"}`}
                    />

                    <button disabled={loading} className="btn btn-primary"> {loading ? <div className="d-flex justify-content-center"><ReactLoading height={'6%'} width={'6%'} type="spin" /></div> : "Enviar Solicitud"} </button>
                    <p
                        onClick={() => {
                            router.push("/login");
                        }}
                        className="register"
                    >
                        ¿Ya tienes cuenta? Iniciar Sesion
                    </p>
                </form>
            </div>

            <img src="/Vectors.svg" className="vectors"></img>
        </div>
    );
}
