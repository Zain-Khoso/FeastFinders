'use client';

// Lib Imports.
import { useReducer } from 'react';

// Local Imports.
import UsernameEmail from './UsernameEmail';

import reducer from './reducer';
// Component.
export default function Form() {
    const [_, dispatch] = useReducer(reducer, {});

    return (
        <section className="w-full flex-1 py-4">
            {/* Email & Password */}
            <UsernameEmail dispatch={dispatch} />
        </section>
    );
}
