// Lib Imports.
import { Metadata } from 'next';
import React from 'react';

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

// Types.
type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <main className="w-full h-[100dvh] flex justify-center items-center primary-gradiant">
            <section className="w-full h-full bg-white flex flex-col justify-center align-center gap-8 px-4 md:max-w-[500px] md:max-h-[700px] md:rounded-xl">
                {children}
            </section>
        </main>
    );
}
