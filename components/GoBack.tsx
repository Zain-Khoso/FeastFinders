'use client';

// Lib Imports.
import { useRouter } from 'next/navigation';

// Text || Link Format.
export function GoBack() {
    const router = useRouter();

    return (
        <button
            type="button"
            className="text-sm text-slate-500 underline"
            onClick={() => router.back()}
        >
            Go back
        </button>
    );
}
