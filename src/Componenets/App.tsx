import React from 'react';
import { useAppSelector } from '../ReduxManagement/hooks';
import Equipment from './Equipment';
import UserForm from './UserForm';

function App() {
  const user = useAppSelector((state) => state.user);
  return (
    <div className="App">
      <UserForm />
      <Equipment />
    </div>
  );
}

export default App;
