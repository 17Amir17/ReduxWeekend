import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { setUser } from '../Reducers/userReducer';
import { useAppDispatch } from '../ReduxManagement/hooks';

export default function UserForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const workplaceRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    const fullName = nameRef.current?.value;
    const workplace = workplaceRef.current?.value;
    const date = dateRef.current?.valueAsDate;
    if (fullName && workplace && date) {
      dispatch(setUser({ fullName, workplace, date }));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter all forms',
      });
    }
  };

  return (
    <div className="user-form">
      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder="eq: John Doe" ref={nameRef} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Workplace</Form.Label>
        <Form.Control
          type="text"
          placeholder="eq: Belingson"
          ref={workplaceRef}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Enter Date:</Form.Label>
        <Form.Control type="date" placeholder="dd/mm/yyyy" ref={dateRef} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
}
