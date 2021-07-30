import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../Breadcrum/BreadCrum'
import Footer from '../../Footer/Footer';

import petition_get from '../../../utils/petitions/petition_get';
import TemplateItem from './TemplateItem';
import TemplateDetails from './TemplateDetails';
export default function Templates() {

    const [data, setData] = useState(null)
    const [selectOneTemplate, setSelectOneTemplate] = useState(false)

    useEffect(() => {

        petition_get("getListTemplate").then(result => {

            result.data.data.map((element, i) => element.available = i > 1 ? "availableTemplate" : "successTemplate")

            setData(result.data.data)



            console.log(result.data)

        }).catch(error => console.log(error))
    }, [])

    const handleClickTemplate = (e) => {

        setSelectOneTemplate(e)
    }


    return (
        <div className="content">
            <BreadCrumb title="Tablero" subtitle="Plantillas Disponibles" />
            {selectOneTemplate ? <TemplateDetails setSelectOneTemplate={setSelectOneTemplate} selectOneTemplate={selectOneTemplate} /> : <div className="container-templates">
                {data && data.map(element => <TemplateItem handleClickTemplate={handleClickTemplate} element={element} />)}
            </div>}

            <Footer />
        </div>
    )
}
