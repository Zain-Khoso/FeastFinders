// Types.
export type State = {
    account_type: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    username: string;
    password: string;
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

export default function reducer(state: State, action: Action) {
    const newFeild: any = {};
    newFeild[action.fieldName] = action.fieldValue;

    return {
        ...state,
        ...newFeild,
    };
}
