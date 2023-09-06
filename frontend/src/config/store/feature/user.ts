import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// TODO: Why using string for storing info and user roles?
interface currentUser {
  info: string,
  roles: string
}

// TODO: Why defining these types if you can access to this info by using currentUser
interface currentUserInfo {
  info: string,
}
interface currentUserRoles {
  roles: string,
}

const initialState: currentUser = {
  info: '{}',
  roles: '{}',
}

const user = createSlice({
  name: 'user',
  initialState,

  reducers: {
    changeInfo(state, action: PayloadAction<currentUserInfo>) {
      state.info = action.payload.info
    },
    changeRole(state, action: PayloadAction<currentUserRoles>) {
      state.roles = action.payload.roles
    },
  }
})

export const {
  changeInfo,
  changeRole
} = user.actions

export const currentSelector = (state: { currentStore: currentUser }) => state.currentStore;

export default user.reducer;