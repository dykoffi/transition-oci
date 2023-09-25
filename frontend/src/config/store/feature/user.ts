import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentUser = {
  info: string;
  roles: string;
};

interface CurrentUserInfo {
  info: string;
}
interface CurrentUserRoles {
  roles: string;
}

const initialState: CurrentUser = {
  info: '{}',
  roles: '{}',
};

const user = createSlice({
  name: 'user',
  initialState,

  reducers: {
    changeInfo(state, action: PayloadAction<CurrentUserInfo>) {
      state.info = action.payload.info;
    },
    changeRole(state, action: PayloadAction<CurrentUserRoles>) {
      state.roles = action.payload.roles;
    },
  },
});

export const { changeInfo, changeRole } = user.actions;

export const currentSelector = (state: { currentStore: CurrentUser }) => state.currentStore;

export default user.reducer;
