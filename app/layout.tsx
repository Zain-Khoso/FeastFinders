import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

const inter = Roboto({ weight: '400' });

export const metadata: Metadata = {
    title: 'Feast Finders',
    description: 'All the feasts you need available at one place.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
