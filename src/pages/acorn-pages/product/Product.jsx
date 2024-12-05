import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import OrderModal from './OrderModal';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './modal.css';
const Product = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <>
        <Button variant="contained" onClick={handleShow}>
            발주하기
        </Button>

        <Modal show={show} onHide={handleClose}
            dialogClassName="custom-modal"
            style={{
                zIndex: 1500,
                overflowY: 'auto'
            }}>
            <Modal.Header closeButton>
            <Modal.Title>발주 화면</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <OrderModal handleClose={handleClose}></OrderModal>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>닫기</Button>
            </Modal.Footer>
        </Modal>
        </> 
    );
}

export default Product;