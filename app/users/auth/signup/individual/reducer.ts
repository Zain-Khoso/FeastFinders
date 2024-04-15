// Types.
type State = {
    email: string;
    username: string;
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
