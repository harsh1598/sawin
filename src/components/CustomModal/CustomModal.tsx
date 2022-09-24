import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from '../../components/Button/Button';

import './CustomModal.scss';

interface PropData {
    show: boolean;
    handleClose: any,
    title: string,
    content: string,
    submitHandler: any,
    inputValue: any,
    disabled: boolean
}

const CustomModal = (props: PropData) => {

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton className='modalHeader'>
                <Modal.Title className='modalTitle'>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='form-style'>
                <p className='modalContent'>{props.content}</p>
                <input className='form-control' onChange={(event) => props.inputValue(event.target.value)} />
            </Modal.Body>
            <Modal.Footer>
                <Button label={'Reset'} b_type='RESET' onClick={props.submitHandler} b_disabled={props.disabled} />
                <Button label='Cancel' b_type='CANCEL' onClick={props.handleClose} />
            </Modal.Footer>
        </Modal>
    );
}

export default CustomModal;