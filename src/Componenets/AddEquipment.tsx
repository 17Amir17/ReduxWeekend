import { userInfo } from 'os';
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { addEquipment } from '../Reducers/equipmentReducer';
import { useAppDispatch, useAppSelector } from '../ReduxManagement/hooks';

export default function AddEquipment() {
  const nameRef = React.useRef<HTMLInputElement>(null);
  const fullQuantityRef = React.useRef<HTMLInputElement>(null);
  const quantityRef = React.useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.fullName);

  const onAdd = () => {
    const name = nameRef.current?.value;
    const fullQuantity = fullQuantityRef.current?.value;
    const quantity = quantityRef.current?.value;
    if (name && fullQuantity && quantity) {
      dispatch(
        addEquipment({
          creator: user,
          equipment: {
            name,
            fullQuantity: Number(fullQuantity),
            quantity: Number(quantity),
          },
        })
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter all forms',
      });
    }
  };

  return (
    <div className="add-equip">
      <Form.Group className="mb-3">
        <Form.Label>Item Name</Form.Label>
        <Form.Control type="text" placeholder="eq:Syringe" ref={nameRef} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Full Quantity</Form.Label>
        <Form.Control type="number" ref={fullQuantityRef} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Current Quantity</Form.Label>
        <Form.Control type="number" ref={quantityRef} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={onAdd}>
        Add
      </Button>
    </div>
  );
}
