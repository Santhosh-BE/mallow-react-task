import { ThunkAction } from "redux-thunk";
import { AuthState } from "./LoginTypes";

export interface RootState {
    Auth: AuthState;
    User: UserState;
}

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface UserApiResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
}

export interface UserState {
    loading: boolean;
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
    selectedUser?: User;
    error?: string;
    isSearchMode?: boolean;
    searchQuery?: string;
    originalData?: User[];
}

export interface UserFormProps {
    onFinish?: (values: Partial<User>) => void;
    initialValues?: Partial<User>;
    isEditing?: boolean;
    onCancel?: () => void;
    loading?: boolean;
}

export type UserRequestAction = { type: string };
export type UserSuccessAction = { type: string; payload: UserApiResponse };
export type UserErrorAction = { type: string; payload: string };
export type UserSetPageAction = { type: string; payload: number };
export type UserSetPageSizeAction = { type: string; payload: number };

export type UserGetByIdRequestAction = { type: string };
export type UserGetByIdSuccessAction = { type: string; payload: User };
export type UserGetByIdErrorAction = { type: string; payload: string };

export type UserUpdateRequestAction = { type: string };
export type UserUpdateSuccessAction = { type: string; payload: User };
export type UserUpdateErrorAction = { type: string; payload: string };

export type UserDeleteRequestAction = { type: string };
export type UserDeleteSuccessAction = { type: string; payload: number };
export type UserDeleteErrorAction = { type: string; payload: string };

export type UserCreateRequestAction = { type: string };
export type UserCreateSuccessAction = { type: string; payload: User };
export type UserCreateErrorAction = { type: string; payload: string };

export type UserSetFilteredDataAction = { type: string; payload: { data: User[]; query: string } };

export type UserActionTypes =
    | UserRequestAction
    | UserSuccessAction
    | UserErrorAction
    | UserSetPageAction
    | UserSetPageSizeAction
    | UserGetByIdRequestAction
    | UserGetByIdSuccessAction
    | UserGetByIdErrorAction
    | UserUpdateRequestAction
    | UserUpdateSuccessAction
    | UserUpdateErrorAction
    | UserDeleteRequestAction
    | UserDeleteSuccessAction
    | UserDeleteErrorAction
    | UserCreateRequestAction
    | UserCreateSuccessAction
    | UserCreateErrorAction
    | UserSetFilteredDataAction;

export type AppActions = UserActionTypes;

export interface SuccessResponse<T = any> {
    success: true;
    data: T;
}

export interface ErrorResponse {
    success: false;
    message?: string;
}

export type ActionResult<T = any> = SuccessResponse<T> | ErrorResponse;

export type AppThunk<ReturnType = Promise<ActionResult>> = ThunkAction<ReturnType, RootState, unknown, AppActions>;
