'use client';

// Lib Imports.
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

// Local Imports.
import type { State, Action } from './reducer';
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

const formSchema = z.object({
    firstname: z
        .string({ required_error: 'Firstname is required.' })
        .trim()
        .min(3, { message: 'Firstname must be at least 3 characters.' })
        .max(20, { message: "Firstname can't exceed 14 characters." }),
    lastname: z
        .string({ required_error: 'Lastname is required.' })
        .trim()
        .min(3, { message: 'Lastname must be at least 3 characters.' })
        .max(20, { message: "Lastname can't exceed 14 characters." }),
});
type FormData = z.infer<typeof formSchema>;

// Component.
export default function FirstnameLastname({
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
                {/* Firstname */}
                <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                        <FormItem>
                            {form.formState.errors.firstname ? (
                                <FormMessage />
                            ) : (
                                <FormLabel>Firstname</FormLabel>
                            )}
                            <FormControl>
                                <Input {...field} placeholder="John" />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Lastname */}
                <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem>
                            {form.formState.errors.lastname ? (
                                <FormMessage />
                            ) : (
                                <FormLabel>Lastname</FormLabel>
                            )}
                            <FormControl>
                                <Input {...field} placeholder="Doe" />
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
