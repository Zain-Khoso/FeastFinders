'use client';

// Lib Imports.
import { useState, useReducer } from 'react';

// Local Imports.
import { Api } from '@/utils/axiosInstances';
import reducer, { initialState } from './reducer';
import EmailUsernamePhone from '../EmailUsernamePhone';
import CountryCity from '../CountryCity';
import NameCategoryHours from './NameCategoryHours';
import AddressAboutMe from '../AddressAboutMe';
import Password from '../Password';

// Component.
export default function Form() {
    const [step, setStep] = useState(1);
    const [state, dispatch] = useReducer(reducer, initialState);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);
    const signupUser = async function (password: {
        password: string;
        confirmPassword: string;
    }): Promise<StatusAndMessageResponse> {
        const { data } = await Api.post('/users/business/signup', {
            ...state,
            ...password,
        });
        return data;
    };

    if (step === 1)
        return (
            <EmailUsernamePhone
                defaultValues={state}
                dispatch={dispatch}
                nextStep={nextStep}
            />
        );
    else if (step === 2)
        return (
            <CountryCity
                defaultValues={state}
                dispatch={dispatch}
                nextStep={nextStep}
                prevStep={prevStep}
            />
        );
    else if (step === 3)
        return (
            <NameCategoryHours
                defaultValues={state}
                dispatch={dispatch}
                nextStep={nextStep}
                prevStep={prevStep}
            />
        );
    else if (step === 4)
        return (
            <AddressAboutMe
                defaultValues={state}
                dispatch={dispatch}
                nextStep={nextStep}
                prevStep={prevStep}
            />
        );
    else if (step === 5)
        return (
            <Password
                defaultValues={state}
                prevStep={prevStep}
                signupUser={signupUser}
            />
        );
}
