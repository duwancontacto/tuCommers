import React, { useState, useEffect } from "react";
import { Table, Card, Input, Button } from "reactstrap";
import ButtonHover from "./ButtonHover";
import styled from "styled-components";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Loading from "../LoadingPage/LoadingPage"

const ContainerPagination = styled.div`
  padding: 20px;
  margin: 0;

  .btn-page {
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: #a6b0cf;
    width: 30px;
    height: 30px;
    border-radius: 3px;
    margin: 0 5px;
    padding: 0;
    svg {
      color: #a6b0cf;
    }
    &:focus {
      outline: none;
    }
  }
  .active {
    background: #536be1;
  }

  @media (max-width: 768px) {
    padding: 0;
    .container-pages {
      display: flex;
      justify-content: center;
    }
  }
`;
const Pages = ({ data, setPagination, pagination, cantPagination }) => {
    let page = [];

    for (let i = 0; i < Math.trunc(data); i++) {
        page.push(i);
    }

    const onClickPage = (index) => {
        index = (index + 1) * cantPagination;
        setPagination(index);
    };

    return (
        <>
            {page.map((pag, index) => {
                if (
                    (index + 1 >= pagination / cantPagination - 2 &&
                        index + 1 <= pagination / cantPagination) ||
                    (index + 1 <= pagination / cantPagination + 2 &&
                        index + 1 >= pagination / cantPagination)
                ) {
                    return (
                        <button
                            className={`btn-page ${pagination / cantPagination === index + 1 && "active"
                                } `}
                            onClick={() => {
                                onClickPage(index);
                            }}
                            key={index}
                        >
                            {" "}
                            {index + 1}{" "}
                        </button>
                    );
                }
            })}
        </>
    );
};

export default function CustomTable({
    data,
    size,
    bordered,
    pagination: paginationData,
    responsive,
    loading

}) {
    /* Example of Data  (content is array of endpoint)
  
    OBLIGATORIO: 
     *title  (define los nombres de las columnas y a que valores entra)
     *content (lista de valores) 
    
    OPCIONALES: 
     
     *actions (para opciones de eliminar o editar)
     *search (funcion de busqueda en base a los campos del title)
     *addButton (para aquellas tablas que requieren un boton de agregas mas )
    
    
    data: {
            title: [
              {title: "Presence Id", key: "presence_id"},
              {title: "First Name", key: "first_name"},
              {title: "Last Name", key: "last_name"},
            ],
            content: [...result.result],
            actions: {
              title: "Devices",
              content: [
                {
                  icon: <DescriptionIcon />,  //Svg icon
                  handleClick: handleOpenDevicesModal,  //Function 
                },
              ],
            },
            search:{
            label:"Label del input Search"
            },
            addButton: {
             label: "Add Menu",
                          handleClick: () => { setModalAdd(true) }
            }
  
  
          }
  
   
     Pagination 
  
     pagination por default = 10 
     responsive por default = true 
     size por default = "md"
  
  
     loading  true para activarlo, false para desactivarlo 
  
      <CustomTable loading={false} responsive={true} pagination={3} bordered={true} size="md" data={data} />
  
   
   */
    const cantPagination = paginationData || 10;
    const [pagination, setPagination] = useState(cantPagination);
    const [search, setSearch] = useState("")
    const [dataFilter, setDataFilter] = useState([])


    useEffect(() => {
        if (data) setDataFilter(data.content)
    }, [data])

    const onChangeSearch = (e) => {

        if (e.target.value === "") return handleDeleteSearch()
        setSearch(e.target.value)

        let dataFilterCopy = [];
        data.title.map(element => {
            data.content.filter(elementTwo => {
                if (elementTwo[element.key].toLowerCase().includes(e.target.value) && !dataFilterCopy.find(elementThree => elementThree.id === elementTwo.id)) {
                    dataFilterCopy.push(elementTwo)
                }
            })
        })


        setDataFilter(dataFilterCopy)
    }

    const handleDeleteSearch = () => {
        setSearch("")
        setDataFilter(data.content)
    }

    const onClickNext = () => {
        if (pagination < data.content.length) {
            setPagination(pagination + cantPagination);
        }
    };

    const onClickBack = () => {
        if (pagination > cantPagination) {
            setPagination(pagination - cantPagination);
        }
    };





    if (data) {
        return (
            <div className="table mt-5">
                <Card body >

                    {data.header &&
                        <div className="table-container">
                            <div className="table-container-icon">
                                {data.header.icon}
                            </div>
                            <h3 className="card-title m-0">{data.header.title}</h3>
                        </div>}



                    {(data.search || data.addButton) && <div className=" table-options" >
                        {data.search && <div className="table-search" >
                            <label
                                htmlFor="search"
                                style={{
                                    cursor: "pointer",
                                    position: "absolute",
                                    top: "7px",
                                    left: "10px",
                                }}
                            >
                                <SearchIcon />
                            </label>
                            <Input
                                id="search"
                                name="search"
                                value={search}
                                onChange={onChangeSearch}
                                placeholder={data.search.label}
                                type="text"
                                className="submit-input-table"
                            />

                            {search.trim() !== "" && <ButtonHover className="table-reset" onClick={handleDeleteSearch} >
                                <HighlightOffIcon />
                            </ButtonHover>}

                        </div>}
                        {data.addButton && <button onClick={data.addButton.handleClick} className="button-custom button-blue submit-form-table" ><AddIcon /> {data.addButton.label}</button>}
                    </div>}


                    {/* Table of data */}

                    <Table responsive={responsive || true} hover size={size || "md"}>
                        <thead >
                            <tr>
                                {data.title.map((element, i) => (
                                    <th key={i}>
                                        {element.title}
                                    </th>
                                ))}
                                {data.actions && (
                                    <th style={{ textAlign: "right" }} > {data.actions.title} </th>
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {dataFilter.map((element, i) => {
                                if (
                                    (i < pagination && i >= pagination - cantPagination) ||
                                    !pagination
                                ) {
                                    return (
                                        <tr className={`${bordered && "border"}`} key={i}>
                                            {data.title.map((elementTwo, index) => (
                                                <th key={index}>
                                                    {elementTwo.secondKey ? `${element[elementTwo.key][elementTwo.secondKey]}` : `${element[elementTwo.key]}`}
                                                </th>
                                            ))}
                                            {data.actions && (
                                                <th
                                                    className={` ${data.actions.content.length > 1 &&
                                                        "d-flex justify-content-end"
                                                        }`}
                                                >
                                                    {data.actions.content.map((elementTwo, index) => (
                                                        <ButtonHover
                                                            key={index}
                                                            style={{
                                                                margin:
                                                                    data.actions.content.length === 1
                                                                        ? "0 auto"
                                                                        : "0",
                                                            }}
                                                            onClick={() => {
                                                                elementTwo.handleClick(element);
                                                            }}
                                                        >
                                                            {elementTwo.icon}
                                                        </ButtonHover>
                                                    ))}
                                                </th>
                                            )}
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </Table>

                    {/* Pagination */}
                    {dataFilter && dataFilter.length > cantPagination && (
                        <ContainerPagination>
                            <div className="col-12 container-pages">
                                <button className="btn-page pl-2" onClick={onClickBack}>
                                    {" "}
                                    <ArrowBackIosIcon />{" "}
                                </button>
                                <Pages
                                    pagination={pagination}
                                    setPagination={setPagination}
                                    cantPagination={cantPagination}
                                    data={
                                        (dataFilter.length / cantPagination) % 1 === 0
                                            ? dataFilter.length / cantPagination
                                            : dataFilter.length / cantPagination + 1
                                    }
                                />
                                <button className="btn-page" onClick={onClickNext}>
                                    {" "}
                                    <ArrowForwardIosIcon />
                                </button>
                            </div>
                        </ContainerPagination>
                    )}
                </Card>
            </div >
        );
    }
    return <Loading />;
}
