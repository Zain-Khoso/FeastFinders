'use client';

// Lib Imports.
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { FaArrowRight, FaSpinner } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// Local Imports.
import { Api } from '@/utils/axiosInstances';
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

// Types.
type Props = {
    defaultValues: IndividualState | BusinessState;
    dispatch: React.Dispatch<IndividualAction | BusinessAction>;
    nextStep: () => void;
};

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required.' })
        .email({ message: 'Invalid email address.' }),
    username: z
        .string()
        .min(1, { message: 'Username is required.' })
        .min(4, { message: 'Username must be at least 4 characters.' })
        .max(16, { message: "Username can't exceed 16 characters." })
        .refine(
            (username: string): string | boolean =>
                /^[a-zA-Z0-9-_]*$/.test(username),
            {
                message:
                    'Username can only contain letters, numbers, underscores, and hyphens.',
            }
        ),
    phone: z
        .string()
        .min(1, { message: 'Phone is required.' })
        .refine(
            (phone: string) =>
                /^(\+?\d{1,3})?[-. (]?\d{3}[-. )]?\d{3}[-. ]?\d{4}$/.test(
                    phone
                ),
            { message: 'Invalid phone number format.' }
        ),
});
type FormData = z.infer<typeof formSchema>;

// Component.
export default function EmailPhoneCountryCity({
    defaultValues,
    dispatch,
    nextStep,
}: Props) {
    // React Hook Form Config.
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const { toast } = useToast();

    const onSubmit: SubmitHandler<FormData> = async function (data) {
        try {
            const res = await Api.post('/api/users/available', data);

            if (!res.data.status) {
                const { email, username, phone } = res.data.errors;

                if (email)
                    form.setError('email', { type: 'custom', message: email });
                if (username)
                    form.setError('username', {
                        type: 'custom',
                        message: username,
                    });
                if (phone)
                    form.setError('phone', { type: 'custom', message: phone });

                return;
            }
        } catch {
            toast({
                variant: 'destructive',
                title: 'Server Error.',
                description:
                    'Unable to get a response from the server. Please try again later.',
            });
            return;
        }

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
                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    disabled={form.formState.isSubmitting}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>

                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="xyz@example.com"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Username */}
                <FormField
                    control={form.control}
                    name="username"
                    disabled={form.formState.isSubmitting}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>

                            <FormControl>
                                <Input {...field} placeholder="john_doe" />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Phone */}
                <FormField
                    control={form.control}
                    name="phone"
                    disabled={form.formState.isSubmitting}
                    render={({ field: { ref, ...field } }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <PhoneInput
                                    {...field}
                                    inputProps={{ ref }}
                                    country={'pk'}
                                    inputClass="!h-10 !w-full !rounded-md !border !border-input !text-sm !focus:border-2 !focus:border-slate-900 !disabled:cursor-not-allowed !disabled:opacity-50"
                                />
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
                        Next
                        {form.formState.isSubmitting ? (
                            <FaSpinner
                                className="ml-1 animate-spin"
                                size={12}
                            />
                        ) : (
                            <FaArrowRight className="ml-1" size={12} />
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
