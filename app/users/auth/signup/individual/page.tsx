// Lib Imports.
import type { Metadata } from 'next';
import Link from 'next/link';

// Local Imports.
import Form from './Form';

// Metadata
export const metadata: Metadata = {
    title: 'Sign Up for Feast Finder: Your Premier Destination for Food Delivery',
    description:
        'Join Feast Finder, your premier destination for seamless food delivery. Sign up now to explore a diverse range of cuisines curated for your palate. With our intuitive platform, ordering your favorite dishes has never been easier. Indulge in a world of flavor today.',
    keywords: [
        'food delivery',
        'sign up',
        'culinary experience',
        'easy ordering',
        'diverse cuisines',
        'feast finder',
    ],
};

export default function SignupPage() {
    return (
        <>
            {/* Header */}
            <div className="w-full flex flex-col items-center gap-2">
                <h1 className="text-black text-xl font-semibold">Sign Up</h1>
                <p className="text-slate-400 text-md">
                    Enjoy your delicious meals!
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
