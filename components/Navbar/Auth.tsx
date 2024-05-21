'use client';

// Lib Imports.
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { LogInIcon, Loader2 } from 'lucide-react';

// Local Imports.
import { Api } from '@/utils/axiosInstances';
import { Button } from '../ui/button';
import { Large, Muted } from '../ui/typography';

// Component.
export default function Auth() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const authToken = localStorage.getItem('auth');

        if (!authToken) setIsAuthenticated(false);
        else
            (async function () {
                try {
                    const { data } = await Api.get(
                        `/users/auth/verify-user/${authToken}`
                    );

                    setIsAuthenticated(true);
                    setUsername(data.user.username);
                } catch {
                    setIsAuthenticated(false);
                }
            })();

        setIsLoading(false);

        return () => setIsLoading(true);
    }, []);

    if (isAuthenticated)
        return (
            <Large>
                <Muted>{username}</Muted>
            </Large>
        );

    return (
        <Link href="/login">
            <Button
                type="button"
                size="sm"
                disabled={isAuthenticated}
                className={'flex items-center gap-1'}
            >
                Login
                {isLoading ? (
                    <Loader2 size={16} className={'animate-spin'} />
                ) : (
                    <LogInIcon size={16} />
                )}
            </Button>
        </Link>
    );
}
