// Lib Imports.
import Link from 'next/link';

// Types.
type Props = { children: React.ReactNode };

// Component.
export default function layout({ children }: Props) {
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
            {children}
            {/* Footer || Log In Link */}
            <footer className="w-full flex justify-center">
                <p className="text-slate-400 text-md">
                    Already have an account?&nbsp;
                    <Link href="/users/auth/lgoin" className=" text-cyan-500">
                        Login
                    </Link>
                    .
                </p>
            </footer>
        </>
    );
}
