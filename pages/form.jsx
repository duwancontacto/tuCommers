import React, { useState, useEffect, useContext } from 'react'

import PersonIcon from '@material-ui/icons/Person';
import StoreIcon from '@material-ui/icons/Store';
import CheckIcon from '@material-ui/icons/Check';
import { useRouter } from "next/router";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import Steps from "../Components/Formulario/Steps"
import { useToasts } from 'react-toast-notifications';



import petition_get from "../utils/petitions/petition_get"
import LoadingPage from '../Components/LoadingPage/LoadingPage';


export default function formulario() {
    const { addToast } = useToasts();
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0)
    const [activeCheckMark, setActiveCheckMark] = useState(false)
    const [loading, setLoading] = useState(true)

    const STEP = [
        { label: "Informacion Personal" },
        { label: "Empresa" },
        { label: "Finalizado" },
    ];
    function ColorlibStepIcon(props) {
        const icons = {
            1: <PersonIcon />,
            2: <StoreIcon />,
            3: <CheckIcon />,
        };
        return <div>{icons[String(props.icon)]}</div>;
    }

    useEffect(() => {
        petition_get("getDataUser")
            .then((result) => {
                setLoading(result.data.data.registerComplete)
                if (result.data.data.registerComplete) return router.push("/dashboard")
            })
            .catch((error) => { setLoading(false); if (error.response) return addToast(error.response.data.data, { appearance: 'error', autoDismiss: true, }); })
    }, [])

    return (

        <div className="container-formulario ">
            {loading ? <div style={{ height: "100vh" }}><LoadingPage /></div> : <>      <div
                className="title"
                onClick={() => {
                    localStorage.removeItem("userAuth")
                    return router.push("/")
                }}
                style={{ zIndex: 2000, color: "white", position: "absolute" }}
            >
                TuCommers
            </div>
                <div className="container-form2 row m-0">
                    <img className="img-form  img-fluid" src="./form.png" />
                    <div className="container-opacity"> </div>
                    <div className="container-formx ">
                        <h2>Completa el <span> Formulario  </span>de Registro </h2>
                        <div className="container-inputs">
                            {!activeCheckMark &&
                                <Stepper alternativeLabel activeStep={activeStep}>
                                    {STEP.map((element, i) => (
                                        <Step key={i}>
                                            <StepLabel
                                                className={`step-color ${activeStep >= i && "activeStep"}`}
                                                /* onClick={() => { setActiveStep(i) }} */
                                                style={{ cursor: "pointer" }}
                                                StepIconComponent={ColorlibStepIcon}
                                            >{element.label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            }


                            <Steps checkMark={activeCheckMark} setCheckMark={setActiveCheckMark} setActiveStep={setActiveStep} activeStep={activeStep} />
                        </div>
                    </div>
                </div> </>}

        </div>
    )
}
