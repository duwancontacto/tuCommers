

const petitionError = (error, addToast) => {
    console.log(error)
    if (error.response && error.response.data && error.response.data.data) {
        return addToast(error.response.data.data, { appearance: 'error', autoDismiss: true, });
    }
    return addToast("Hubo un error al procesar tu solicitud", { appearance: 'error', autoDismiss: true, });

}


export default petitionError