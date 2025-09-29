import { Dispatch } from "redux";

export interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface AuthAction {
    type: string;
    payload?: { loading?: boolean; data?: { token?: string } } | { loading?: boolean };
}

export interface AuthState {
  getauth: AuthAction[];
}
export type ThunkAction = (dispatch: Dispatch<AuthAction>) => Promise<{ success: boolean; data?: any; message?: string }>;