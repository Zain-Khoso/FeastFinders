// Lib Imports.
import type { Metadata } from 'next';
import Link from 'next/link';

// Types.
type Props = {
    children: React.ReactNode;
};

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

// Component.
export default function SignupPage({ children }: Props) {
    return (
        <main className="w-full min-h-screen flex justify-center items-center primary-gradiant">
            <section className="w-[320px] max-h-full aspect-[10/14] flex flex-col justify-between items-center bg-slate-100 px-2 py-4 rounded-lg">
                {children}
            </section>
        </main>
    );
}
