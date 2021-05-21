import React from "react";
import {LoginStyles} from "../Assets/Login/LoginStyle";
import * as yup from "yup";
import {useFormik} from "formik";
import {useRouter} from "next/router";
import ThemeButton from "../Components/ThemeButton/ThemeButton";

export default function Login() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "Test@test.com",
      password: "12345",
    },
    validationSchema: yup.object({
      email: yup.string().required("Es Requerido el Email"),
      password: yup.string().required("Es Requerido la Contraseña"),
    }),
    onSubmit: (e) => {
      console.log(e);
    },
  });

  return (
    <LoginStyles>
      <div className="container-form">
        <ThemeButton />
        <h4>Iniciar Sesion</h4>
        <p>Inicia sesion para acceder a tu cuenta de administrador</p>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            id="email"
            component="input"
            placeholder="USUARIO"
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
            placeholder="USUARIO"
            className="form-control"
          />
          <button className="btn btn-primary">Iniciar Sesion</button>
          <p className="restart-password">
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
    </LoginStyles>
  );
}
