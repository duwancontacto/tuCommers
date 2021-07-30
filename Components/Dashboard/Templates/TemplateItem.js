import React from 'react'

export default function TemplateItem({ element, handleClickTemplate }) {
    return (
        <div onClick={() => { handleClickTemplate(element) }} className="template">
            <div className="template-img">
                <img src={element.urlImg} alt="image template" />
            </div>
            <div className="template-content">
                <h3>
                    Principal
                </h3>
                <p className="description">Plantilla principal de la pagina</p>
                <p className="price"> <span>$</span>4.99 </p>
                <p className={`${element.available}`}> {element.available === "availableTemplate" ? "Disponible " : "Adquirir Plantilla"}  </p>
            </div>
        </div>
    )
}
