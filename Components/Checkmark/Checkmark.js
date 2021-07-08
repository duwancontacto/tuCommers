import React, { useState, useEffect } from 'react'
import DoneIcon from '@material-ui/icons/Done';
export default function Checkmark({ loading }) {
    return (
        <>
            <div className={`my-2 ${loading && "label-check-active"}`}>
                <label className={`label-check `} htmlFor="">
                    <div className="check-icon">
                        < DoneIcon />
                    </div>
                </label>
                <p className="check-text pt-3">
                    Completado
                </p>
            </div>

        </>
    )
}
