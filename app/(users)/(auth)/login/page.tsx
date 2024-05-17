// Lib Imports.
import { Metadata } from 'next';
import Link from 'next/link';

// Local Imports.
import { H3, Muted, P } from '@/components/ui/typography';
import LogInForm from './Form';

// Metadata.
export const metadata: Metadata = {
    title: 'Login to Feast Finder: Your Premier Destination for Food Delivery',
    description:
        'Log in to Feast Finder, your premier destination for seamless food delivery. Access your account and explore a diverse range of cuisines curated for your palate. Join us and indulge in a world of flavor today.',
    keywords: [
        'login',
        'feast finder',
        'food delivery platform',
        'account access',
        'seamless login',
    ],
};

// Component.
export default function LogIn() {
    return (
        <>
            {/* Header */}
            <header className="w-full flex flex-col items-center gap-1">
                <H3>Log In</H3>
                <Muted>Log in and Explore Culinary Delights</Muted>
            </header>

            {/* Body || Form */}
            <LogInForm />

            {/* Footer || Log In Link */}
            <footer className="w-full flex justify-center">
                <P>
                    Don&apos;t have an account yet?&nbsp;
                    <Link href="/users/auth/login" className=" text-cyan-500">
                        Create an Account
                    </Link>
                    .
                </P>
            </footer>
        </>
    );
}
