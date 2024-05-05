'use client';

// Lib Imports.
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import {
    FaCheck,
    FaSpinner,
    FaArrowLeft,
    FaEye,
    FaEyeSlash,
} from 'react-icons/fa';

// Local Imports.
import type {
    State as IndividualState,
    Action as IndividualAction,
} from './individual/reducer';
import type {
    State as BusinessState,
    Action as BusinessAction,
} from './business/reducer';
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
import { List } from '@/components/ui/typography';

// Types.
type Props = {
    defaultValues: IndividualState | BusinessState;
    prevStep: () => void;
    signupUser: (password: {
        password: string;
        confirmPassword: string;
    }) => Promise<StatusAndMessageResponse>;
};

const formSchema = z
    .object({
        password: z
            .string()
            .min(1, { message: 'Create a strong password.' })
            .min(8, { message: 'Password must be at least 8 characters.' })
            .max(30, { message: "Password can't exceed 30 characters." })
            .refine(
                (password) =>
                    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+.])[a-zA-Z0-9!@#$%^&*()_+.]+$/.test(
                        password
                    ),
                { message: 'Passwod not strong enough.' }
            ),
        confirmPassword: z.string({ required_error: "Passwords don't match." }),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
        message: "Passwords don't match.",
        path: ['confirmPassword'],
    });
type FormData = z.infer<typeof formSchema>;

// Component.
export default function Password({
    defaultValues,
    prevStep,
    signupUser,
}: Props) {
    // React Hook Form Config.
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const router = useRouter();
    const { toast } = useToast();

    // Input Visiblity States.
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const onSubmit: SubmitHandler<FormData> = async function (data) {
        // Signing the user up.
        try {
            const { status, message } = await signupUser({ ...data });

            if (status) {
                toast({ title: 'Sign up successful.', description: message });
                router.push('/');
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Sign up failed.',
                    description: message,
                });
                router.push('/');
            }
        } catch (err: any) {
            toast({
                variant: 'destructive',
                title: 'Sign up failed.',
                description: err.message,
            });
            router.push('/');
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                {/* Guide */}
                <List>
                    <li>Between 8 to 30 characters long.</li>
                    <li>At least 1 uppercase character.</li>
                    <li>At least 1 lowercase character.</li>
                    <li>At least 1 numeric character.</li>
                    <li>At least 1 special character.</li>
                </List>

                {/* Confirm Password */}
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    disabled={form.formState.isSubmitting}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>

                            <FormControl>
                                <div className="flex w-full items-center space-x-2">
                                    <Input
                                        {...field}
                                        type={
                                            confirmPasswordVisible
                                                ? 'text'
                                                : 'password'
                                        }
                                        placeholder="A strong password."
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            setConfirmPasswordVisible(
                                                !confirmPasswordVisible
                                            )
                                        }
                                    >
                                        {confirmPasswordVisible ? (
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
                        variant="outline"
                        type="button"
                        disabled={form.formState.isSubmitting}
                        onClick={prevStep}
                        className="text-slate-500 gap-1"
                    >
                        <FaArrowLeft size={12} /> Prev
                    </Button>

                    <Button
                        disabled={form.formState.isSubmitting}
                        className="primary-gradiant gap-1"
                    >
                        Sign Up
                        {form.formState.isSubmitting ? (
                            <FaSpinner
                                className="ml-1 animate-spin"
                                size={12}
                            />
                        ) : (
                            <FaCheck className="ml-1" size={12} />
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
