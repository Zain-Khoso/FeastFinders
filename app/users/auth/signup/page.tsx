'use client';

// Lib Imports.
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaBusinessTime, FaArrowRight } from 'react-icons/fa';

// Local Imports.
import { Button } from '@/components/ui/button';

// Component.
export default function SignUpForm() {
    const [type, setType] = useState('individual');
    const router = useRouter();

    const onSubmit: React.FormEventHandler<HTMLFormElement> = function (
        event: React.SyntheticEvent<HTMLFormElement>
    ) {
        event.preventDefault();
        router.push(`signup/${type}`);
    };

    return (
        <>
            {/* Header */}
            <header className="w-full flex flex-col items-center gap-2">
                <h1 className="text-black text-xl font-semibold">Sign Up</h1>
                <p className="text-slate-400 text-md">
                    Enjoy your delicious meals!
                </p>
            </header>

            {/* Body || Form */}
            <form
                className="w-full flex-1 flex flex-col justify-around items-center py-4"
                onSubmit={onSubmit}
            >
                <h2 className="text-slate-500 text-xl font-medium">
                    Account Type
                </h2>

                <div className="w-full flex gap-4 px-4">
                    {/* Hidden radio inputs for choice functionality. */}
                    <input
                        type="radio"
                        id="choice_1"
                        name="account_type"
                        value="individual"
                        className="hidden peer/choice1"
                        checked={type === 'individual'}
                        onChange={(e) => setType(e.target.value)}
                    />
                    <input
                        type="radio"
                        id="choice_2"
                        name="account_type"
                        value="business"
                        className="hidden peer/choice2"
                        checked={type === 'business'}
                        onChange={(e) => setType(e.target.value)}
                    />

                    {/* Labels for the inputs | Visible choices */}
                    <label
                        htmlFor="choice_1"
                        className="w-full aspect-square flex flex-col justify-center items-center gap-2 p-2 rounded-lg shadow-[0_0_0.5rem_rgba(0,_0,_0,_0.15)] *:fill-slate-600 *:text-slate-600 opacity-50 peer-checked/choice1:choice-card-active  selection:bg-none hover:cursor-pointer"
                    >
                        <FaUser size={24} className="fill-slate-600" />
                        <span className="text-slate-600 text-md tracking-wide">
                            Individual
                        </span>
                    </label>

                    <label
                        htmlFor="choice_2"
                        className="w-full aspect-square flex flex-col justify-center items-center gap-2 p-2 rounded-lg shadow-[0_0_0.5rem_rgba(0,_0,_0,_0.15)] *:fill-slate-600 *:text-slate-600 opacity-50 peer-checked/choice2:choice-card-active  selection:bg-none hover:cursor-pointer"
                    >
                        <FaBusinessTime size={24} className="" />
                        <span className="text-md tracking-wide font-medium">
                            Business
                        </span>
                    </label>
                </div>

                <Button className="primary-gradiant">
                    Next <FaArrowRight className="ml-1" size={12} />
                </Button>
            </form>

            {/* Footer || Log In Link */}
            <footer className="w-full flex justify-center">
                <p className="text-slate-400 text-md">
                    Already have an account?&nbsp;
                    <Link href="/users/auth/login" className=" text-cyan-500">
                        Login
                    </Link>
                    .
                </p>
            </footer>
        </>
    );
}
