import axios from "axios";
import { authconstants } from "../constants/AuthConstants";
import { Dispatch } from "redux";
import { AuthAction, LoginFormData, ThunkAction } from "../../types/LoginTypes";



export const auth = (value: LoginFormData): ThunkAction => {
    return async (dispatch: Dispatch<AuthAction>) => {
        dispatch({
            type: authconstants.REQUEST,
            payload: { loading: true },
        });
        try {
            const response = await axios.post(`https://reqres.in/api/login`, value, {
                headers: {
                    "x-api-key": "reqres-free-v1",
                },
            });
            const data = response.data;
            localStorage.setItem("ACCESS_TOKEN", data.token);
            dispatch({
                type: authconstants.SUCCESS,
                payload: { loading: false, data },
            });
            return { success: true, data };
        } catch (error: unknown) {
            dispatch({
                type: authconstants.ERROR,
                payload: { loading: false },
            });
            return { success: false, message: (error as { response?: { data?: { error?: string } } })?.response?.data?.error || "Login failed. Please try again." };
        }
    };
};
