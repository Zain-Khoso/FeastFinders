'use client';

// Lib Imports.
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { FaArrowRight, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';

// Local Imports.
import type { State, Action } from './individual/reducer';
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

// Types.
type Props = {
    defaultValues: State;
    dispatch: React.Dispatch<Action>;
    nextStep: () => void;
    prevStep: () => void;
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
    dispatch,
    nextStep,
    prevStep,
}: Props) {
    // React Hook Form Config.
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    // Input Visiblity States.
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const onSubmit: SubmitHandler<FormData> = function (data) {
        Object.keys(data).forEach((_, index) => {
            dispatch({
                fieldName: Object.keys(data)[index],
                fieldValue: Object.values(data)[index],
            });
        });

        // Going to the next step.
        nextStep();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            {form.formState.errors.password ? (
                                <FormMessage />
                            ) : (
                                <FormLabel>Password</FormLabel>
                            )}
                            <FormControl>
                                <div className="flex w-full max-w-sm items-center space-x-2">
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
                        </FormItem>
                    )}
                />

                {/* Guide */}
                <ul className="list-inside list-disc p-2 border rounded-md">
                    <li>Between 8 to 30 characters long.</li>
                    <li>At least 1 uppercase character.</li>
                    <li>At least 1 lowercase character.</li>
                    <li>At least 1 numeric character.</li>
                    <li>At least 1 special character.</li>
                </ul>

                {/* Confirm Password */}
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            {form.formState.errors.confirmPassword ? (
                                <FormMessage />
                            ) : (
                                <FormLabel>Confirm Password</FormLabel>
                            )}
                            <FormControl>
                                <div className="flex w-full max-w-sm items-center space-x-2">
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
                        </FormItem>
                    )}
                />

                <div className="flex justify-center items-center gap-4 !mt-8">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={prevStep}
                        className="text-slate-500 gap-1"
                    >
                        <FaArrowLeft size={12} /> Prev
                    </Button>

                    <Button className="primary-gradiant gap-1">
                        Next <FaArrowRight className="ml-1" size={12} />
                    </Button>
                </div>
            </form>
        </Form>
    );
}
