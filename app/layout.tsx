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
    title: 'Feast Finders',
    description: 'All the feasts you need available at one place.',
};

// Component.
export default function RootLayout({ children }: Readonly<Props>) {
    return (
        <html lang="en">
            <body className={font.className}>{children}</body>
        </html>
    );
}
