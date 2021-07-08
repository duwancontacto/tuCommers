import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import petition_post from "../utils/petitions/petition_post";
import ReactLoading from "react-loading"
import { useToasts } from 'react-toast-notifications';


export default function Register() {

  const { addToast } = useToasts();
  const router = useRouter();

  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "Test@test.com",
      password: "123456",
      confir_password: "123456",
    },
    validationSchema: yup.object({
      email: yup.string().email("El Email no es Valido").required("Es Requerido el Email"),
      password: yup.string().required("Es Requerido la Contraseña").min(6, "Minimo 6 Caracteres"),
      confir_password: yup.string().required("Es Requerido la Contraseña").min(6, "Minimo 6 Caracteres"),
    }),
    onSubmit: (e) => {
      if (e.password === e.confir_password) {
        setLoading(true)
        return petition_post("Register", { data: { email: e.email, password: e.password } })
          .then((result) => { setLoading(false); localStorage.setItem("userAuth", JSON.stringify(result.data.data)), router.push("/form") })
          .catch((error) => { setLoading(false); addToast(error.response.data.data, { appearance: 'error', autoDismiss: true, }); })
      }
      addToast("Las Contrasenas no son iguales, por favor verifica", { appearance: 'error', autoDismiss: true, });
    },
  });


  useEffect(() => {
    if (formik.errors && formik.isSubmitting) Object.keys(formik.errors).map(element => addToast(formik.errors[element], { appearance: 'error', autoDismiss: true, }))
  }, [formik.isSubmitting, formik.errors])


  return (
    <div className="register-container">
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
        {/*  <ThemeButton /> */}
        <h4 className="mt-5">Registrate</h4>
        <p>Registrate para poder crear tu Tienda Online</p>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            id="email"
            component="input"
            placeholder="Correo"
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
          <button disabled={loading} className="btn btn-primary text-center"> {loading ? <div className="d-flex justify-content-center"><ReactLoading height={'6%'} width={'6%'} type="spin" /></div> : " Registrate"} </button>
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
