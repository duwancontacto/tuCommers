import React, { useEffect } from 'react'
import petition_delete from '../../../utils/petitions/petition_delete'
import { useToasts } from 'react-toast-notifications';
import petitionError from '../../../utils/petitions/petitionError';

export default function GroupDelete({ idDelete, modal, setModal, reloadDataContent }) {

    const { addToast } = useToasts();
    useEffect(() => {

        if (modal.active && modal.send) {
            if (idDelete.role === "Admin") return addToast("Error, No se puede eliminar el Admin del grupo", { appearance: 'error', autoDismiss: true, });
            setModal({ ...modal, loading: true })
            petition_delete("deleteUserOfGroup", { userId: idDelete._id })
                .then(result => {
                    addToast("Usuario Eliminado Correctamente", { appearance: 'success', autoDismiss: true, });
                    setModal({ ...modal, active: false, loading: false, send: false })
                    reloadDataContent()
                }).catch((error) => {
                    setModal({ ...modal, loading: false, send: false })
                    petitionError(error, addToast)
                })
        }
    }, [modal])

    return (
        <div>
            Estas Seguro de eliminar el  usuario {idDelete.email} ?
        </div>
    )
}
