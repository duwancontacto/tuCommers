import React from "react";
import {LoginStyles} from "../Assets/Login/LoginStyle";
import * as yup from "yup";
import {useFormik} from "formik";
import {useRouter} from "next/router";
import ThemeButton from "../Components/ThemeButton/ThemeButton";
export default function Register() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "Test@test.com",
      password: "12345",
      confir_password: "12345",
    },
    validationSchema: yup.object({
      email: yup.string().required("Es Requerido el Email"),
      password: yup.string().required("Es Requerido la Contraseña"),
      confir_password: yup.string().required("Es Requerido la Contraseña"),
    }),
    onSubmit: (e) => {
      console.log(e);
    },
  });

  return (
    <LoginStyles>
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
        <h4>Registrate</h4>
        <p>Registrate para poder crear tu Tienda Online</p>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            id="email"
            component="input"
            placeholder="Correo"
            className="form-control"
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
            className="form-control"
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
            className="form-control"
          />
          <p
            className="restart-password text-center m-0"
            style={{fontSize: "12px"}}
          >
            Acepto los terminos y condiciones y las politicas de privacidad
          </p>
          <button className="btn btn-primary">Registrate</button>
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
    </LoginStyles>
  );
}
