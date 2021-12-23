import React, {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
} from 'react';
import { useAppDispatch, useAppSelector } from '../ReduxManagement/hooks';
import { Table, Button } from 'react-bootstrap';
import { removeEquipment, updateEquipment } from '../Reducers/equipmentReducer';
import { resetUser } from '../Reducers/userReducer';

export default function Equipment() {
  const user = useAppSelector((state) => state.user);
  const equipment = useAppSelector((state) => state.equipment.equipment);
  const dispatch = useAppDispatch();

  const onQuantityChange: ChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const target = (
      (event.currentTarget as HTMLElement).parentElement?.parentElement
        ?.children[1] as HTMLElement
    ).innerText;
    const quantity = Number(event.target.value);

    if (target) dispatch(updateEquipment({ target, update: { quantity } }));
  };

  const onDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = (
      (event.currentTarget as HTMLElement).parentElement?.parentElement
        ?.children[1] as HTMLElement
    ).innerText;
    if (target) {
      dispatch(removeEquipment(target));
    }
  };

  return (
    <div className="equipment">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Full Quantity</th>
            <th>Current Quantity</th>
            <th>Missing</th>
            {user.userSet ? <th>Remove</th> : <></>}
          </tr>
        </thead>
        <tbody>
          {equipment.map((eq, i) => {
            return (
              <tr key={eq.name}>
                <th>{i}</th>
                <th>{eq.name}</th>
                <th>{eq.fullQuantity}</th>
                <th>
                  <input
                    type={'number'}
                    defaultValue={eq.quantity}
                    onChange={onQuantityChange}
                  ></input>
                </th>
                <th>{eq.fullQuantity - eq.quantity}</th>
                {user.userSet ? (
                  <th>
                    {eq.creator === user.fullName ? (
                      <Button onClick={onDelete}>Delete</Button>
                    ) : (
                      <></>
                    )}
                  </th>
                ) : (
                  <></>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button
        onClick={() => {
          dispatch(resetUser());
        }}
      >
        Change User
      </Button>
    </div>
  );
}
