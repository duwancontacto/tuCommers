import React from 'react'

export default function BreadCrum({ title, subtitle }) {
    return (
        <div className="content-title">
            <h3>
                {title}
            </h3>
            {subtitle && <span>
                {">"} {subtitle}
            </span>}

        </div>
    )
}
