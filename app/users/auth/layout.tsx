// Types.
type Props = {
    children: React.ReactNode;
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
