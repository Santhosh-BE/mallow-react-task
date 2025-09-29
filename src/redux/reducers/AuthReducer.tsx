import { AuthAction, AuthState } from "../../types/LoginTypes";
import { authconstants } from "../constants/AuthConstants";

const initialValues: AuthState = {
    getauth: [],
};

export const authReducer = (value: AuthState = initialValues, action: AuthAction): AuthState => {
    switch (action?.type) {
        case authconstants.REQUEST:
            return { getauth: [...value.getauth, action] };
        case authconstants.SUCCESS:
            return { getauth: [...value.getauth, action] };
        case authconstants.ERROR:
            return { getauth: [...value.getauth, action] };
        default:
            return value;
    }
};