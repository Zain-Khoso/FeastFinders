// Types.
type Props = {
    children: React.ReactNode;
};

export function H1({ children }: Props) {
    return (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {children}
        </h1>
    );
}

export function H2({ children }: Props) {
    return (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {children}
        </h2>
    );
}

export function H3({ children }: Props) {
    return (
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {children}
        </h2>
    );
}

export function H4({ children }: Props) {
    return (
        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {children}
        </h2>
    );
}

export function P({ children }: Props) {
    return <h2 className="leading-7 [&:not(:first-child)]:mt-6">{children}</h2>;
}

export function Blackquote({ children }: Props) {
    return (
        <blockquote className="mt-6 border-l-2 pl-6 italic">
            {children}
        </blockquote>
    );
}

export function List({ children }: Props) {
    return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>;
}

export function InlineCode({ children }: Props) {
    return (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {children}
        </code>
    );
}

export function Lead({ children }: Props) {
    return <p className="text-xl text-muted-foreground">{children}</p>;
}

export function Large({ children }: Props) {
    return <div className="text-lg font-semibold">{children}</div>;
}

export function Small({ children }: Props) {
    return (
        <small className="text-sm font-medium leading-none">{children}</small>
    );
}

export function Muted({ children }: Props) {
    return <p className="text-sm text-muted-foreground">{children}</p>;
}
