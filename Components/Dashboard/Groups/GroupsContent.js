import React, { useState, useEffect, useRef } from 'react'
import Breadcrumb from "../../Breadcrum/BreadCrum"
import CustomTable from '../../CustomTable/CustomTable'
import DeleteIcon from '@material-ui/icons/Delete';
import GroupIcon from '@material-ui/icons/Group';
import CustomModal from "../../CustomModal/CustomModal"

import GroupAdd from './GroupAdd';
import GroupDelete from './GroupDelete';
import Footer from '../../Footer/Footer';

import petition_get from '../../../utils/petitions/petition_get';


export default function GroupsContent() {

    const [dataTable, setDataTable] = useState(null)
    const [reloadData, setReloadData] = useState(false)


    const reloadDataContent = () => {
        setReloadData(!reloadData)
    }

    useEffect(() => {

        petition_get("getListOfGrups").then(result => {
            result.data.data.users.map(element => {

                if (!element.registerComplete)
                    element.names = element.email.split("@")[0]
                else
                    element.names = element.personalData[0].names + " " + element.personalData[0].lastNames

                if (element.lastRegister === element.register)
                    element.lastRegister = "No Registrado"
                else {

                    let getLastRegister = new Date(element.lastRegister)
                    element.lastRegister = getLastRegister.toLocaleString()
                }
            })

            setDataTable({
                header: {
                    icon: <GroupIcon />,
                    title: "Lista de usuarios"
                },
                title: [
                    { title: "Name", key: "names" },
                    { title: "Email", key: "email" },
                    { title: "Role", key: "role" },
                    { title: "Ultima Conexion", key: "lastRegister" },
                ],

                content: [...result.data.data.users],
                actions: {
                    title: "",
                    content: [
                        /*  {
                             icon: <EditIcon />,
                             handleClick: () => { setModalEdit(true) },
                         }, */
                        {
                            icon: <DeleteIcon />,
                            handleClick: (e) => { setModalDelete({ ...modalDelete, active: true }); setIdDelete(e) },
                        },
                    ],
                },
                search: {
                    label: "Buscar un usuario"
                },
                addButton: {
                    label: "Agregar Usuario",
                    handleClick: () => { setModalAdd({ ...modalAdd, active: true }) }
                }
            })
        }).catch(error => console.log(error))


    }, [reloadData])

    const [modalEdit, setModalEdit] = useState(false)

    //Controller Modal Add User 
    const [modalAdd, setModalAdd] = useState({
        active: false,
        send: false,
        title: "Agregar Usuario",
        loading: false,
        buttonAccept: {
            title: "Guardar",
            handleClick: () => { setModalAdd({ ...modalAdd, active: true, send: true }) }
        },
        buttonClose: {
            title: "Cerrar",
            handleClick: () => { setModalAdd({ ...modalAdd, active: false }) }
        },
    })
    //Controller Modal Add User 
    const [idDelete, setIdDelete] = useState(null)
    const [modalDelete, setModalDelete] = useState({
        active: false,
        send: false,
        title: "Eliminar Usuario",
        loading: false,
        buttonAccept: {
            title: "Guardar",
            handleClick: () => { setModalDelete({ ...modalDelete, active: true, send: true }) }
        },
        buttonClose: {
            title: "Cerrar",
            handleClick: () => { setModalDelete({ ...modalDelete, active: false }) }
        },
    })





    return (
        <div className="content">
            <CustomModal data={modalAdd}><GroupAdd reloadDataContent={reloadDataContent} modal={modalAdd} setModal={setModalAdd} /></CustomModal>
            <CustomModal data={modalDelete}><GroupDelete idDelete={idDelete} reloadDataContent={reloadDataContent} modal={modalDelete} setModal={setModalDelete} /></CustomModal>
            <Breadcrumb title="Tablero" subtitle="Grupo de usuarios" />
            <CustomTable data={dataTable} />
            <Footer />

        </div>
    )
}
