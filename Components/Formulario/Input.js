import React from 'react'
import PhoneInput from 'react-phone-input-2'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export default function Input({ size, formik, type, name, optional, onBlur, placeholder, label, onChangeInput, dropdownOptions }) {
    const getKeyNames = name.split(".")
    let value = ""
    if (formik.values[getKeyNames[0]]) {
        value = formik.values[getKeyNames[0]][getKeyNames[1]]
    }


    return (
        <div className={`col-12 col-md-${size || 6} text-left mb-3  ${formik.errors[getKeyNames[0]] && formik.errors[getKeyNames[0]][getKeyNames[1]] && formik.touched[getKeyNames[0]] && formik.touched[getKeyNames[0]][getKeyNames[1]] && "input-error-form"}`}>
            <label className="labelInput" htmlFor={name} style={{ width: "100%", textAlign: "left" }}>
                {label} {optional && <span className="optional">(Opcional)</span>} :
            </label>

            {(type === "text" || type === "email") && <input type={type} id={name} name={name} onBlur={onBlur} value={value} onChange={onChangeInput} placeholder={placeholder} className={`form-control ${formik.errors[getKeyNames[0]] && formik.errors[getKeyNames[0]][getKeyNames[1]] && formik.touched[getKeyNames[0]] && formik.touched[getKeyNames[0]][getKeyNames[1]] && "form-control-error"}`} />}


            {type === "numberInput" && <PhoneInput
                country={'us'}
                value={value}
                name={name}
                id={name}
                onChange={(e) => { onChangeInput({ target: { value: e, name } }) }}
            />}

            {type === "dropdown" && <select id={name} name={name} onBlur={onBlur} value={value} onChange={onChangeInput} placeholder={placeholder} className={`form-control ${formik.errors[getKeyNames[0]] && formik.errors[getKeyNames[0]][getKeyNames[1]] && formik.touched[getKeyNames[0]] && formik.touched[getKeyNames[0]][getKeyNames[1]] && "form-control-error"}`}>
                {dropdownOptions.map((element, i) => <option key={i} value={element.value}> {element.label} </option>)}
            </select>}

            {/*           {type === "directionInput" && <GooglePlacesAutocomplete apiKey="AIzaSyATOwVQwMcbQfyESE4ojeS7h7VC8CkBhBA" />} */}

        </div>
    )
}
