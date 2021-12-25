import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkAction,
} from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import Equipment from '../Componenets/Equipment';
import { fullEquipmentList } from '../db/equipmentSeed';
import { RootState } from '../ReduxManagement/store';
import { resetUser } from './userReducer';

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
        for (let att in action.payload.update) {
          const transformedAtt = att as keyof Equipment;
          (eqToUpdate as any)[transformedAtt] = //This is the only solution I found https://github.com/microsoft/TypeScript/issues/31663
            action.payload.update[transformedAtt];
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
    removeEquipment: (state, action: PayloadAction<string>) => {
      state.equipment = state.equipment.filter(
        (eq) => eq.name !== action.payload
      );
    },
  },
});

export const submitEquipment = (
  equipment: Equipment[]
): ThunkAction<void, RootState, unknown, AnyAction> => {
  // sending equiplment
  // .....
  console.log('Sending equipment');
  return async function (dispatch, _getState) {
    setTimeout(() => {
      dispatch(resetUser());
    }, 1000);
  };
};

export const { updateEquipment, addEquipment, removeEquipment } =
  equipSlice.actions;

export default equipSlice.reducer;
