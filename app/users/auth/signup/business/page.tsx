// Lib Imports.
import type { Metadata } from 'next';
import Link from 'next/link';

// Local Imports.
import Form from './Form';

// Metadata
export const metadata: Metadata = {
    title: 'Sign Up as a Business with Feast Finder: Expand Your Reach & Increase Sales',
    description:
        'Join Feast Finder as a business and expand your reach to new customers. With our platform, you can showcase your offerings to a wide audience and increase your sales. Sign up now and join the culinary community!',
    keywords: [
        'business signup',
        'feast finder',
        'food delivery platform',
        'increase sales',
        'expand reach',
        'culinary community',
    ],
};

export default function SignupPage() {
    return (
        <>
            {/* Header */}
            <div className="w-full flex flex-col items-center gap-2">
                <h1 className="text-black text-xl font-semibold">Sign Up</h1>
                <p className="text-slate-400 text-md">
                    Expand Your Business with Feast Finder!
                </p>
            </div>

            {/* Body || Form */}
            <Form />

            {/* Footer || Log In Link */}
            <div className="w-full flex justify-center">
                <p className="text-slate-400 text-md">
                    Already have an account?&nbsp;
                    <Link href="/users/auth/login" className=" text-cyan-500">
                        Login
                    </Link>
                    .
                </p>
            </div>
        </>
    );
}
