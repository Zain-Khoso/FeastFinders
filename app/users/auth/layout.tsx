import React from 'react';

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <main className="w-full h-[100dvh] flex justify-center items-center primary-gradiant">
            <section className="w-full max-w-[500px] h-full max-h-[700px] bg-white flex flex-col justify-center align-center gap-8 px-4 md:rounded-xl">
                {children}
            </section>
        </main>
    );
}
