// Types.
export type State = {
    account_type: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    username: string;
    password: string;
    confirmPassword: string;
    profilePicture?: string;
    coverPicture?: string;
    about_me: string;
    business_name: string;
    business_hours?: string;
    business_category: string;
    address: string;
};
export type Action = {
    fieldName: string;
    fieldValue: string;
};

// Initial State.
export const initialState: State = {
    account_type: 'business',
    email: '',
    phone: '',
    country: '',
    city: '',
    username: '',
    password: '',
    confirmPassword: '',
    profilePicture: '',
    coverPicture: '',
    about_me: '',
    business_name: '',
    business_hours: '',
    business_category: '',
    address: '',
};

// Reducer Function.
export default function reducer(state: State, action: Action) {
    const newFeild: any = {};
    newFeild[action.fieldName] = action.fieldValue;

    return {
        ...state,
        ...newFeild,
    };
}
