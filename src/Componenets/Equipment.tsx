import React, { ChangeEvent, ChangeEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../ReduxManagement/hooks';
import { Table } from 'react-bootstrap';
import { updateEquipment } from '../Reducers/equipmentReducer';

export default function Equipment() {
  const user = useAppSelector((state) => state.user);
  const equipment = useAppSelector((state) => state.equipment.equipment);
  const dispatch = useAppDispatch();

  const onQuantityChange: ChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const target =
      event.target.parentElement?.parentElement?.children[1].innerHTML;
    const quantity = Number(event.target.value);

    if (target) dispatch(updateEquipment({ target, update: { quantity } }));
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
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
