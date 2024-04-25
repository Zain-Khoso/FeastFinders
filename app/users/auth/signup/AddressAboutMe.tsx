'use client';

// Lib Imports.
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

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
import { Textarea } from '@/components/ui/textarea';

// Types.
type Props = {
    defaultValues: State;
    dispatch: React.Dispatch<Action>;
    nextStep: () => void;
    prevStep: () => void;
};

const formSchema = z.object({
    address: z.string({ required_error: 'Address is required.' }),
    about_me: z.string({ required_error: 'About me is required.' }).max(500, {
        message: 'Lastname cannot have more than 500 characters.',
    }),
});
type FormData = z.infer<typeof formSchema>;

// Component.
export default function AddressAboutMe({
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
                {/* Address */}
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            {form.formState.errors.address ? (
                                <FormMessage />
                            ) : (
                                <FormLabel>Address</FormLabel>
                            )}
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="123 Main Street, Anytown, USA"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* About me */}
                <FormField
                    control={form.control}
                    name="about_me"
                    render={({ field }) => (
                        <FormItem>
                            {form.formState.errors.about_me ? (
                                <FormMessage />
                            ) : (
                                <FormLabel>About me</FormLabel>
                            )}
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none"
                                />
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