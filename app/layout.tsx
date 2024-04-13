// Lib Imports.
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

// Local Imports.
import './globals.css';

// Types.
type Props = {
    children: React.ReactNode;
};

// Font.
const font = Roboto({ weight: '400', subsets: ['latin'] });

// Metadata
export const metadata: Metadata = {
    title: 'Feast Finder: Explore Culinary Delights & Easy Food Delivery',
    description:
        'Discover culinary delights with Feast Finder, your premier destination for seamless food delivery. From gourmet meals to local favorites, explore a diverse range of cuisines curated for your palate. With our intuitive platform, ordering your favorite dishes has never been easier. Join us and indulge in a world of flavor today.',
    keywords: [
        'food delivery',
        'gourmet meals',
        ' local favorites',
        ' culinary experience',
        ' easy ordering',
        ' diverse cuisines',
        ' feast finder',
    ],
    authors: [
        {
            name: 'Feast Finder Team',
            url: 'https://github.com/Zain-Khoso/FeastFinder.git',
        },
    ],
    robots: { index: true, follow: true },
    openGraph: {
        title: 'Feast Finder: Explore Culinary Delights & Easy Food Delivery',
        description:
            'Discover culinary delights with Feast Finder, your premier destination for seamless food delivery.',
        images: '/brand/logo.ico',
        url: 'https://github.com/Zain-Khoso/FeastFinder.git',
    },
    twitter: {
        title: 'Feast Finder: Explore Culinary Delights & Easy Food Delivery',
        description:
            'Discover culinary delights with Feast Finder, your premier destination for seamless food delivery.',
        images: '/brand/logo.ico',
        card: 'summary_large_image',
    },
};

// Component.
export default function RootLayout({ children }: Readonly<Props>) {
    return (
        <html lang="en">
            <body className={font.className}>{children}</body>
        </html>
    );
}
