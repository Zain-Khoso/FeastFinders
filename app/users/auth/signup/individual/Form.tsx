'use client';

// Lib Imports.
import { useState, useReducer } from 'react';

// Local Imports.
import EmailUsernamePhone from '../EmailUsernamePhone';
import reducer from './reducer';

// Component.
export default function Form() {
    const [step, setStep] = useState(1);
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

    // if (step === 2)
    //     return (
    //         <CountryCityPhone
    //             defaultValues={state}
    //             dispatch={dispatch}
    //             nextStep={nextStep}
    //             prevStep={prevStep}
    //         />
    //     );
}