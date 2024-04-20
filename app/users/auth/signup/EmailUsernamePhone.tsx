'use client';

// Lib Imports.
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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
};

const formSchema = z.object({
    email: z
        .string({ required_error: 'Email is required.' })
        .email({ message: 'Invalid Email Address' }),
    username: z
        .string({ required_error: 'Username is required.' })
        .min(4, { message: 'Should be atleast 4 characters long.' })
        .max(16, { message: 'Should not be longer than 16 characters.' })
        .refine(
            (username: string): string | boolean =>
                /^[a-zA-Z0-9-_]*$/.test(username),
            {
                message:
                    'Username can only contain letters (a-z, A-Z), numbers (0-9), underscores (_) and hyphens (-).',
            }
        ),
    phone: z
        .string({ required_error: 'Phone is required.' })
        .min(1, { message: 'A phone number is required.' })
        .refine(
            (phone: string) =>
                /^(\+?\d{1,3})?[-. (]?\d{3}[-. )]?\d{3}[-. ]?\d{4}$/.test(
                    phone
                ),
            { message: 'Invalid Phone.' }
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
                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            {form.formState.errors.email ? (
                                <FormMessage />
                            ) : (
                                <FormLabel>Email</FormLabel>
                            )}
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="xyz@example.com"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Username */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            {form.formState.errors.username ? (
                                <FormMessage />
                            ) : (
                                <FormLabel>Username</FormLabel>
                            )}
                            <FormControl>
                                <Input {...field} placeholder="john_doe" />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Phone */}
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field: { ref, ...field } }) => (
                        <FormItem>
                            {form.formState.errors.phone ? (
                                <FormMessage />
                            ) : (
                                <FormLabel>Phone</FormLabel>
                            )}
                            <FormControl>
                                <PhoneInput
                                    {...field}
                                    inputProps={{ ref }}
                                    country={'pk'}
                                    inputClass="!h-10 !w-full !rounded-md !border !border-input !text-sm !focus:border-2 !focus:border-slate-900 !disabled:cursor-not-allowed !disabled:opacity-50"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex justify-center items-center gap-4 !mt-8">
                    <Button className="primary-gradiant">
                        Next <FaArrowRight className="ml-1" size={12} />
                    </Button>
                </div>
            </form>
        </Form>
    );
}
