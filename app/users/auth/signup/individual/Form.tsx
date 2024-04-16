'use client';

// Lib Imports.
import { useState, useReducer } from 'react';

// Local Imports.
import EmailPhone from '../EmailPhone';
import UsernamePassword from '../UsernamePassword';
import CountryCityPhone from '../CountryCityPhone';
import reducer from './reducer';

// Component.
export default function Form() {
    const [step, setStep] = useState(1);
    const [state, dispatch] = useReducer(reducer, {});

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    if (step === 1)
        return (
            <EmailPhone
                defaultValues={state}
                dispatch={dispatch}
                nextStep={nextStep}
            />
        );
    else if (step === 2)
        return (
            <UsernamePassword
                defaultValues={state}
                dispatch={dispatch}
                nextStep={nextStep}
                prevStep={prevStep}
            />
        );
    else if (step === 3)
        return (
            <CountryCityPhone
                defaultValues={state}
                dispatch={dispatch}
                nextStep={nextStep}
                prevStep={prevStep}
            />
        );
}
