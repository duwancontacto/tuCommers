import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LoadingPage from '../LoadingPage/LoadingPage';
export default function CustomModal({ data, children }) {

    return (
        <Modal centered isOpen={data.active} >
            {data.loading ? <LoadingPage /> : <> <ModalHeader >{data.title}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={data.buttonClose.handleClick}>{data.buttonClose.title}</Button>
                    <Button color="primary" onClick={data.buttonAccept.handleClick}>{data.buttonAccept.title}</Button>
                </ModalFooter> </>}

        </Modal>
    )
}
