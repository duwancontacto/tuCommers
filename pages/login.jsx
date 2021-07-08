import React, { useEffect, useState } from "react";

import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import ReactLoading from "react-loading"
import petition_post from "../utils/petitions/petition_post";
import { useToasts } from 'react-toast-notifications';


export default function Login() {
  const router = useRouter();
  const { addToast } = useToasts();

  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "Test@test.com",
      password: "123456",
    },

    validationSchema: yup.object({
      email: yup.string().email("El Email no es Valido").required("Es Requerido el Email"),
      password: yup.string().required("Es Requerido la Contraseña").min(6, "Minimo 6 Caracteres"),
    }),

    onSubmit: (e) => {
      setLoading(true)
      return petition_post("Login", { data: { email: e.email, password: e.password } })
        .then((result) => {
          setLoading(false);
          addToast("Usuario Autenticado Correctamente", { appearance: 'success', autoDismiss: true, });
          localStorage.setItem("userAuth", JSON.stringify(result.data.data))
          router.push(result.data.data.registerComplete ? "/dashboard" : "/form")
        })
        .catch((error) => { setLoading(false); if (error.response) return addToast(error.response.data.data, { appearance: 'error', autoDismiss: true, }); })
    },
  });


  useEffect(() => {
    if (formik.errors && formik.isSubmitting) Object.keys(formik.errors).map(element => addToast(formik.errors[element], { appearance: 'error', autoDismiss: true, }))
  }, [formik.isSubmitting, formik.errors])

  return (
    <div className="login">
      <div className="container-form">
        <div
          className="title"
          onClick={() => {
            router.push("/");
          }}
        >
          {" "}
          TuCommers{" "}
        </div>
        {/*   <ThemeButton /> */}
        <h4 className="mt-5">Inicia Sesion</h4>
        <p>Inicia sesion para acceder a tu cuenta de administrador</p>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            id="email"
            component="input"
            placeholder="USUARIO"
            className={`form-control ${formik.errors.email && formik.touched.email && "form-control-error"}`}
          />
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
            id="password"
            component="input"
            type="password"
            placeholder="USUARIO"
            className={`form-control ${formik.errors.password && formik.touched.password && "form-control-error"}`}
          />
          <button disabled={loading} className="btn btn-primary"> {loading ? <div className="d-flex justify-content-center"><ReactLoading height={'6%'} width={'6%'} type="spin" /></div> : " Iniciar Sesion"} </button>
          <p onClick={() => {
            router.push("/forgotPassword");
          }} className="restart-password">
            ¿Has olvidado la contraseña? Recuperala
          </p>
          <p
            onClick={() => {
              router.push("/register");
            }}
            className="register"
          >
            ¿No tienes cuenta? Registrate
          </p>
        </form>
      </div>

      <img src="/Vectors.svg" className="vectors"></img>
    </div>
  );
}
