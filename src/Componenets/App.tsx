import React from 'react';
import { useAppSelector } from '../ReduxManagement/hooks';
import AddEquipment from './AddEquipment';
import Equipment from './Equipment';
import UserForm from './UserForm';

function App() {
  const user = useAppSelector((state) => state.user);
  return (
    <div className="App">
      {user.userSet ? (
        <>
          {' '}
          <Equipment />
          <AddEquipment />
        </>
      ) : (
        <UserForm />
      )}
    </div>
  );
}

export default App;
