import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import petition_patch from "../utils/petitions/petition_patch";
import ReactLoading from "react-loading"
import { useToasts } from 'react-toast-notifications';


export default function Register() {

    const { addToast } = useToasts();
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState(null)

    const formik = useFormik({
        initialValues: {
            password: "123456",
            confir_password: "123456",
        },
        validationSchema: yup.object({
            password: yup.string().required("Es Requerido la Contraseña").min(6, "Minimo 6 Caracteres"),
            confir_password: yup.string().required("Es Requerido la Contraseña").min(6, "Minimo 6 Caracteres"),
        }),
        onSubmit: (e) => {
            if (e.password === e.confir_password) {
                setLoading(true)
                console.log("prueba")
                return petition_patch("restartPassword", { data: { password: e.password } }, token)
                    .then((result) => {
                        setLoading(false);
                        addToast("Credenciales Actualizadas Correctamente", { appearance: 'success', autoDismiss: true, });
                        router.push("/login")
                    })
                    .catch((error) => {
                        setLoading(false);
                        if (error.response && error.response.data) {
                            return addToast(error.response.data.data, { appearance: 'error', autoDismiss: true, });
                        }
                        addToast("Hubo un error al procesar tu solicitud", { appearance: 'error', autoDismiss: true, });
                    })
            }
            addToast("Las Contrasenas no son iguales, por favor verifica", { appearance: 'error', autoDismiss: true, });
        },
    });


    useEffect(() => {
        if (formik.errors && formik.isSubmitting) Object.keys(formik.errors).map(element => addToast(formik.errors[element], { appearance: 'error', autoDismiss: true, }))
    }, [formik.isSubmitting, formik.errors])


    //check if a token exists
    useEffect(() => {
        const urlParams = new URL(document.location).searchParams;
        const getToken = urlParams.get("token")
        if (!getToken) return router.push("/login")
        setToken(getToken)
    }, [])


    return (
        <div className="register-container">
            <div className="container-form">
                <div
                    className="title"
                    onClick={() => {
                        router.push("/");
                    }}
                >
                    TuCommers
                </div>
                {/*  <ThemeButton /> */}
                <h4 className="mt-5">Cambia tu Contraseña</h4>
                <p>Cambia tu contraseña para poder acceder a tu cuenta.</p>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="password"
                        id="password"
                        component="input"
                        type="password"
                        placeholder="Contrasena"
                        className={`form-control ${formik.errors.password && formik.touched.password && "form-control-error"}`}
                    />
                    <input
                        value={formik.values.confir_password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="confir_password"
                        id="confir_password"
                        component="input"
                        type="password"
                        placeholder="Confirmar Contrasena"
                        className={`form-control ${formik.errors.confir_password && formik.touched.confir_password && "form-control-error"}`}
                    />
                    <p
                        className="restart-password text-center m-0"
                        style={{ fontSize: "12px" }}
                    >
                        Acepto los terminos y condiciones y las politicas de privacidad
                    </p>
                    <button disabled={loading} className="btn btn-primary text-center"> {loading ? <div className="d-flex justify-content-center"><ReactLoading height={'6%'} width={'6%'} type="spin" /></div> : "Cambiar Contraseña"} </button>
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
