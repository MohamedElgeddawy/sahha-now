import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
  refreshToken: string | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  refreshToken:
    typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null,
  accessToken:
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  isAuthenticated:
    typeof window !== "undefined"
      ? !!localStorage.getItem("accessToken")
      : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ refreshToken: string; accessToken: string }>
    ) => {
      const { refreshToken, accessToken } = action.payload;
      state.refreshToken = refreshToken;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accessToken", accessToken);
    },
    clearCredentials: (state) => {
      state.refreshToken = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export default authSlice.reducer;
