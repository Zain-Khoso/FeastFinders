// Lib Imports.
import React from 'react';


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
