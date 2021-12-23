import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { fullEquipmentList } from '../db/equipmentSeed';

// Define a type for the slice state
interface EquipmentState {
  equipment: Equipment[];
}

interface Equipment {
  name: string;
  quantity: number;
  fullQuantity: number;
  creator?: string;
}

// Define the initial state using that type
const initialState: EquipmentState = {
  equipment: fullEquipmentList.map((eq) => {
    return { ...eq, quantity: 0 };
  }),
};

export const equipSlice = createSlice({
  name: 'equipment',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateEquipment: (
      state,
      action: PayloadAction<{
        target: string;
        update: Partial<Equipment>;
      }>
    ) => {
      const eqToUpdate: Equipment | undefined = state.equipment.find(
        (eq) => eq.name === action.payload.target
      );
      if (eqToUpdate) {
        if (action.payload.update.name) {
          eqToUpdate.name = action.payload.update.name;
        }
        if (action.payload.update.quantity) {
          eqToUpdate.quantity = action.payload.update.quantity;
        }
        if (action.payload.update.fullQuantity) {
          eqToUpdate.fullQuantity = action.payload.update.fullQuantity;
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Equipment not found',
        });
      }
    },
    addEquipment: (
      state,
      action: PayloadAction<{ creator: string; equipment: Equipment }>
    ) => {
      const eq = state.equipment.find(
        (eq) => eq.name === action.payload.equipment.name
      );
      if (eq === undefined) {
        state.equipment.push({
          ...action.payload.equipment,
          creator: action.payload.creator,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Item Exists',
        });
      }
    },
  },
});

export const { updateEquipment, addEquipment } = equipSlice.actions;

export default equipSlice.reducer;
