'use client';

// Lib Imports.
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaSignInAlt, FaSpinner } from 'react-icons/fa';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';

// Local Imports.
import { Api } from '@/utils/axiosInstances';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

// Types.
const formSchema = z.object({
    query: z.string().min(1, { message: 'Username or Email is required.' }),
    password: z
        .string()
        .min(1, { message: 'Password is Required.' })
        .min(8, { message: 'Password Invalid.' })
        .max(30, { message: 'Password Invalid.' }),
});
type FormData = z.infer<typeof formSchema>;

// Component.
export default function LogInForm() {
    // React Hook Form Config.
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: '',
            password: '',
        },
    });

    const router = useRouter();
    const { toast } = useToast();
    const [passwordVisible, setPasswordVisible] = useState(false);

    // Checking for wheather a user is already logged in.
    useEffect(() => {
        (async function () {
            const authToken = localStorage.getItem('auth');

            const { status, data } = await Api.get(
                `users/auth/verify-user/${authToken}`
            );

            if (status === 200) {
                if (data.user.account_type === 'business')
                    router.push('/profile');
                else router.push('/');
            }
        })();
    }, []);

    const onSubmit: SubmitHandler<FormData> = async function (data) {
        // Signing the user up.
        try {
            const {
                data: { message, token },
            } = await Api.post('users/auth/login', { ...data });

            toast({
                title: 'Login successfull.',
                description: message,
            });

            localStorage.setItem('auth', token);

            router.push('/');
        } catch (err: any) {
            try {
                const {
                    response: {
                        status,
                        data: { message },
                    },
                } = err;

                if (status === 500) {
                    toast({
                        variant: 'destructive',
                        title: 'Server Error',
                        description: message,
                    });
                }

                form.setError('query', {
                    message: 'Invalid Email or Username',
                });
                form.setError('password', { message: 'Invalid Password' });
            } catch {
                form.setError('query', {
                    message: 'Invalid Email or Username',
                });
                form.setError('password', { message: 'Invalid Password' });

                toast({
                    variant: 'destructive',
                    title: 'Server Error',
                    description:
                        'We are having some trouble on our side. please try again later.',
                });
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Or Username */}
                <FormField
                    control={form.control}
                    name="query"
                    disabled={form.formState.isSubmitting}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Or Username</FormLabel>

                            <FormControl>
                                <Input {...field} placeholder="john_doe" />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    disabled={form.formState.isSubmitting}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>

                            <FormControl>
                                <div className="flex w-full items-center space-x-2">
                                    <Input
                                        {...field}
                                        type={
                                            passwordVisible
                                                ? 'text'
                                                : 'password'
                                        }
                                        placeholder="A strong password."
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            setPasswordVisible(!passwordVisible)
                                        }
                                    >
                                        {passwordVisible ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </Button>
                                </div>
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-center items-center gap-4 !mt-8">
                    <Button
                        disabled={form.formState.isSubmitting}
                        className="primary-gradiant gap-1"
                    >
                        Log In
                        {form.formState.isSubmitting ? (
                            <FaSpinner
                                className="ml-1 animate-spin"
                                size={12}
                            />
                        ) : (
                            <FaSignInAlt className="ml-1" size={12} />
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
