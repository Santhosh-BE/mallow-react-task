import { UserState, UserActionTypes, UserSuccessAction, UserErrorAction, UserSetPageAction, UserSetPageSizeAction, UserGetByIdSuccessAction, UserGetByIdErrorAction, UserUpdateSuccessAction, UserUpdateErrorAction, UserDeleteSuccessAction, UserDeleteErrorAction, UserCreateSuccessAction, UserCreateErrorAction, UserSetFilteredDataAction } from "../../types/UserTypes";
import { userconstants } from "../constants/UserConstantts";

const initialValues: UserState = {
    loading: false,
    page: 1,
    per_page: 6,
    total: 0,
    total_pages: 0,
    data: [],
    error: undefined,
    isSearchMode: false,
    searchQuery: undefined,
    originalData: undefined,
};

export const userReducer = (state: UserState = initialValues, action: UserActionTypes): UserState => {
    switch (action?.type) {
        case userconstants.REQUEST:
            return { 
                ...state, 
                loading: true, 
                error: undefined 
            };
        
        case userconstants.SUCCESS:
            const successAction = action as UserSuccessAction;
            return {
                ...state,
                loading: false,
                page: successAction.payload.page,
                per_page: successAction.payload.per_page,
                total: successAction.payload.total,
                total_pages: successAction.payload.total_pages,
                data: successAction.payload.data,
                originalData: successAction.payload.data,
                error: undefined,
            };
        
        case userconstants.ERROR:
            const errorAction = action as UserErrorAction;
            return { 
                ...state, 
                loading: false, 
                error: errorAction.payload 
            };
            
        case userconstants.SET_FILTERED_DATA:
            const setFilteredDataAction = action as UserSetFilteredDataAction;
            return {
                ...state,
                data: setFilteredDataAction.payload.data,
                isSearchMode: true,
                searchQuery: setFilteredDataAction.payload.query,
            };
            
        case userconstants.GET_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: undefined
            };
            
        case userconstants.GET_BY_ID_SUCCESS:
            const getByIdSuccessAction = action as UserGetByIdSuccessAction;
            return {
                ...state,
                loading: false,
                selectedUser: getByIdSuccessAction.payload,
                error: undefined
            };
            
        case userconstants.GET_BY_ID_ERROR:
            const getByIdErrorAction = action as UserGetByIdErrorAction;
            return {
                ...state,
                loading: false,
                error: getByIdErrorAction.payload
            };
            
        case userconstants.UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: undefined
            };
            
        case userconstants.UPDATE_SUCCESS:
            const updateSuccessAction = action as UserUpdateSuccessAction;
            return {
                ...state,
                loading: false,
                data: state.data.map(user => 
                    user.id === updateSuccessAction.payload.id ? updateSuccessAction.payload : user
                ),
                originalData: state.originalData ? 
                    state.originalData.map(user => 
                        user.id === updateSuccessAction.payload.id ? updateSuccessAction.payload : user
                    ) : state.originalData,
                selectedUser: updateSuccessAction.payload,
                error: undefined
            };
            
        case userconstants.UPDATE_ERROR:
            const updateErrorAction = action as UserUpdateErrorAction;
            return {
                ...state,
                loading: false,
                error: updateErrorAction.payload
            };
            
        case userconstants.DELETE_REQUEST:
            return {
                ...state,
                loading: true,
                error: undefined
            };
            
        case userconstants.DELETE_SUCCESS:
            const deleteSuccessAction = action as UserDeleteSuccessAction;
            return {
                ...state,
                loading: false,
                data: state.data.filter(user => user.id !== deleteSuccessAction.payload),
                originalData: state.originalData ? 
                    state.originalData.filter(user => user.id !== deleteSuccessAction.payload) : 
                    state.originalData,
                error: undefined
            };
            
        case userconstants.DELETE_ERROR:
            const deleteErrorAction = action as UserDeleteErrorAction;
            return {
                ...state,
                loading: false,
                error: deleteErrorAction.payload
            };
            
        case userconstants.CREATE_REQUEST:
            return {
                ...state,
                loading: true,
                error: undefined
            };
            
        case userconstants.CREATE_SUCCESS:
            const createSuccessAction = action as UserCreateSuccessAction;
            return {
                ...state,
                loading: false,
                data: [...state.data, createSuccessAction.payload],
                originalData: state.originalData ? 
                    [...state.originalData, createSuccessAction.payload] : 
                    state.originalData,
                error: undefined
            };
            
        case userconstants.CREATE_ERROR:
            const createErrorAction = action as UserCreateErrorAction;
            return {
                ...state,
                loading: false,
                error: createErrorAction.payload
            };
        
        default:
            return state;
    }
};