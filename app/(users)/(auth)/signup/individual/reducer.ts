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
    firstname: string;
    lastname: string;
    gender?: 'male' | 'female';
    dob?: string;
    address: string;
};
export type Action = {
    fieldName: string;
    fieldValue: string;
};

// Initial State.
export const initialState: State = {
    account_type: 'individual',
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
    firstname: '',
    lastname: '',
    dob: '',
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
