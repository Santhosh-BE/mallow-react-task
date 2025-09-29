import axios from "axios";
import { userconstants } from "../constants/UserConstantts";
import { AppThunk, User, UserApiResponse, UserActionTypes, RootState, ActionResult, SuccessResponse, ErrorResponse } from "../../types/UserTypes";
import { Dispatch } from "redux";

export const userAction =
    (page: number = 1, size: number = 5): AppThunk =>
    async (dispatch: Dispatch<UserActionTypes>): Promise<ActionResult<UserApiResponse>> => {
        dispatch({
            type: userconstants.REQUEST,
        });

        try {
            const { data } = await axios.get<UserApiResponse>(`https://reqres.in/api/users?page=${page}&per_page=${size}`, {
                headers: {
                    "x-api-key": "reqres-free-v1",
                },
            });

            dispatch({
                type: userconstants.SUCCESS,
                payload: data,
            });
            return { success: true, data } as SuccessResponse<UserApiResponse>;
        } catch (error: unknown) {
            dispatch({
                type: userconstants.ERROR,
                payload: (error as any).message || "Failed to fetch users",
            });
            return { success: false, message: (error as any)?.response?.data?.error || "User Fetch Failed" } as ErrorResponse;
        }
    };

export const getUserByIdAction =
    (id: number): AppThunk<Promise<ActionResult<User>>> =>
    async (dispatch: Dispatch<UserActionTypes>): Promise<ActionResult<User>> => {
        dispatch({
            type: userconstants.GET_BY_ID_REQUEST,
        });

        try {
            const { data } = await axios.get<User>(`https://reqres.in/api/users/${id}`, {
                headers: {
                    "x-api-key": "reqres-free-v1",
                },
            });

            dispatch({
                type: userconstants.GET_BY_ID_SUCCESS,
                payload: data,
            });
            return { success: true, data } as SuccessResponse<User>;
        } catch (error: unknown) {
            dispatch({
                type: userconstants.GET_BY_ID_ERROR,
                payload: (error as any).message || "Failed to fetch user",
            });
            return { success: false, message: (error as any)?.response?.data?.error || "User Fetch Failed" } as ErrorResponse;
        }
    };

export const updateUserAction =
    (id: number, userData: Partial<User>): AppThunk<Promise<ActionResult<User>>> =>
    async (dispatch: Dispatch<UserActionTypes>): Promise<ActionResult<User>> => {
        dispatch({
            type: userconstants.UPDATE_REQUEST,
        });

        try {
            const { data } = await axios.put<User>(`https://reqres.in/api/users/${id}`, userData, {
                headers: {
                    "x-api-key": "reqres-free-v1",
                },
            });

            dispatch({
                type: userconstants.UPDATE_SUCCESS,
                payload: data,
            });
            return { success: true, data } as SuccessResponse<User>;
        } catch (error: unknown) {
            dispatch({
                type: userconstants.UPDATE_ERROR,
                payload: (error as any).message || "Failed to update user",
            });
            return { success: false, message: (error as any)?.response?.data?.error || "User Update Failed" } as ErrorResponse;
        }
    };

export const deleteUserAction =
    (id: number): AppThunk<Promise<ActionResult<undefined>>> =>
    async (dispatch: Dispatch<UserActionTypes>): Promise<ActionResult<undefined>> => {
        dispatch({
            type: userconstants.DELETE_REQUEST,
        });

        try {
            await axios.delete(`https://reqres.in/api/users/${id}`, {
                headers: {
                    "x-api-key": "reqres-free-v1",
                },
            });

            dispatch({
                type: userconstants.DELETE_SUCCESS,
                payload: id,
            });
            return { success: true, data: undefined } as SuccessResponse<undefined>;
        } catch (error: unknown) {
            dispatch({
                type: userconstants.DELETE_ERROR,
                payload: (error as any).message || "Failed to delete user",
            });
            return { success: false, message: (error as any)?.response?.data?.error || "User Delete Failed" } as ErrorResponse;
        }
    };

export const createUserAction =
    (userData: Omit<User, "id">): AppThunk<Promise<ActionResult<User>>> =>
    async (dispatch: Dispatch<UserActionTypes>): Promise<ActionResult<User>> => {
        dispatch({
            type: userconstants.CREATE_REQUEST,
        });

        try {
            const { data } = await axios.post<User>(`https://reqres.in/api/users`, userData, {
                headers: {
                    "x-api-key": "reqres-free-v1",
                },
            });

            dispatch({
                type: userconstants.CREATE_SUCCESS,
                payload: data,
            });
            return { success: true, data } as SuccessResponse<User>;
        } catch (error: unknown) {
            dispatch({
                type: userconstants.CREATE_ERROR,
                payload: (error as any).message || "Failed to create user",
            });
            return { success: false, message: (error as any)?.response?.data?.error || "User Create Failed" } as ErrorResponse;
        }
    };

export const filterUsersAction =
    (query: string, originalData: User[]): AppThunk<Promise<ActionResult<void>>> =>
    async (dispatch: Dispatch<UserActionTypes>): Promise<ActionResult<void>> => {
        if (!query.trim()) {
            dispatch({
                type: userconstants.SET_FILTERED_DATA,
                payload: { data: originalData, query: "" },
            });
            return { success: true, data: undefined } as SuccessResponse<void>;
        }
        const filteredData = originalData.filter(user => 
            user.first_name.toLowerCase().includes(query.toLowerCase()) ||
            user.last_name.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase())
        );

        dispatch({
            type: userconstants.SET_FILTERED_DATA,
            payload: { data: filteredData, query },
        });
        return { success: true, data: undefined } as SuccessResponse<void>;
    };


export const resetSearchAction =
    (): AppThunk<Promise<ActionResult<void>>> =>
    async (dispatch: Dispatch<UserActionTypes>, getState: () => RootState): Promise<ActionResult<void>> => {
        const state = getState();
        const originalData = state.User.originalData || [];
        
        dispatch({
            type: userconstants.SET_FILTERED_DATA,
            payload: { data: originalData, query: "" },
        });
        return { success: true, data: undefined } as SuccessResponse<void>;
    };