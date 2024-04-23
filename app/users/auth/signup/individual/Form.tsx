'use client';

// Lib Imports.
import { useState, useReducer } from 'react';

// Local Imports.
import reducer from './reducer';
import EmailUsernamePhone from '../EmailUsernamePhone';
import CountryCity from '../CountryCity';
import FirstnameLastname from './FirstnameLastname';
import AddressAboutMe from '../AddressAboutMe';

// Component.
export default function Form() {
    const [step, setStep] = useState(4);
    const [state, dispatch] = useReducer(reducer, {});

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

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
            <FirstnameLastname
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
}
