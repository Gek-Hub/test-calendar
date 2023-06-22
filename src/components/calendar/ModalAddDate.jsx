import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function ModalAddDate({addDate, choosenDate}) {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState('');

	// I did modal gialog instead standart prompt
  function handleOpenModal() { 
    if (!date && choosenDate.getTime()!=0) {
      choosenDate.setHours(choosenDate.getHours()+3)
      setDate(choosenDate.toISOString().slice(0,-5).replace(/T/g,' '))
    }
    setShowModal(true);
    //prompt("Enter event date:\nYYYY-MM-DD HH:mm:ss", date))
    
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleAddDate() {
    addDate(date);
    setDate('');
    handleCloseModal();
  }

  return (
    <>
			<label className='red-l' onClick={handleOpenModal}>+</label>
        <Modal show={showModal} onHide={handleCloseModal} size='sm'>
        <Modal.Body>
          <Form.Group className='modal-text'>
						<h2>https://calendar.com</h2>
            <p>Enter event date:
							<br />
							YYYY-MM-DD HH:mm:ss
						</p>
            <Form.Control type="text" value={date} onChange={(e) => setDate(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <div className='modal-button' onClick={handleCloseModal}>
            Cansel
          </div>
          <div className='modal-button' onClick={handleAddDate}>
            OK
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
