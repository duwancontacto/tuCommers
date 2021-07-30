import React from 'react'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { Card } from "reactstrap"
import { Carousel } from 'react-responsive-carousel';
export default function TemplateDetails({ setSelectOneTemplate, selectOneTemplate }) {
    return (
        <div>

            <div className="backTemplate" onClick={() => { setSelectOneTemplate(false) }}>
                <NavigateBeforeIcon /> <span>Volver</span>
            </div>

            <section className="row mt-2">
                <div className="col-12 col-lg-8">
                    <Card body className="p-0 template-carousel">
                        <Carousel infiniteLoop={true} useKeyboardArrows={false}>
                            <div>
                                <img className="img-carousel" src={selectOneTemplate.urlImg} />
                                <p className="legend">Principal</p>
                            </div>
                            <div>
                                <img className="img-carousel" src={selectOneTemplate.urlImg} />
                                <p className="legend">Dashboard</p>
                            </div>
                            <div>
                                <img className="img-carousel" src={selectOneTemplate.urlImg} />
                                <p className="legend">Hi</p>
                            </div>
                            <div>
                                <img className="img-carousel" src={selectOneTemplate.urlImg} />
                                <p className="legend">Hi</p>
                            </div>
                            <div>
                                <img className="img-carousel" src={selectOneTemplate.urlImg} />
                                <p className="legend">Hi</p>
                            </div>
                            <div>
                                <img className="img-carousel" src={selectOneTemplate.urlImg} />
                                <p className="legend">Hi</p>
                            </div>
                            <div>
                                <img className="img-carousel" src={selectOneTemplate.urlImg} />
                                <p className="legend">Hi</p>
                            </div>
                            <div>
                                <img className="img-carousel" src={selectOneTemplate.urlImg} />
                                <p className="legend">Hi</p>
                            </div>
                            <div>
                                <img className="img-carousel" src={selectOneTemplate.urlImg} />
                                <p className="legend">Hi</p>
                            </div>
                            <div>
                                <img className="img-carousel" src={selectOneTemplate.urlImg} />
                                <p className="legend">Hi</p>
                            </div>
                            <div>
                                <img className="img-carousel" src={selectOneTemplate.urlImg} />
                                <p className="legend">Hi</p>
                            </div>
                            <div>
                                <img className="img-carousel" src={selectOneTemplate.urlImg} />
                                <p className="legend">Hi</p>
                            </div>
                        </Carousel>
                    </Card>
                </div>
                <div className="col-12 col-lg-4 pt-3 pt-lg-0">
                    <Card body >

                    </Card>
                </div>
            </section>
        </div>
    )
}
