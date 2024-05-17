// Lib Imports.
import { Metadata } from 'next';
import Link from 'next/link';

// Local Imports.
import SignUpForm from './Form';
import { H3, Muted, P } from '@/components/ui/typography';

// Metadata.
export const metadata: Metadata = {
    title: 'Sign Up for Feast Finder: Individual or Business Account',
    description:
        'Join Feast Finder and choose your account type. Whether you are an individual looking for seamless food delivery or a business aiming to reach more customers, our platform caters to all your needs. Get started now and be part of our culinary community.',
    keywords: [
        'sign up',
        'feast finder',
        'food delivery',
        'individual account',
        'business account',
        'culinary community',
    ],
};

// Component.
export default function SignUpPage() {
    return (
        <>
            {/* Header */}
            <header className="w-full flex flex-col items-center gap-1">
                <H3>Sign Up</H3>
                <Muted>Enjoy your delicious meals!</Muted>
            </header>

            {/* Body || Form */}
            <SignUpForm />

            {/* Footer || Log In Link */}
            <footer className="w-full flex justify-center">
                <P>
                    Already have an account?&nbsp;
                    <Link href="/login" className=" text-cyan-500">
                        Login
                    </Link>
                    .
                </P>
            </footer>
        </>
    );
}
