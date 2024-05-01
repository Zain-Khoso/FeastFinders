'use client';

// Lib Imports.
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

// Local Imports.
import { Api } from '@/utils/axiosInstances';
import type { State, Action } from './reducer';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
    business_name: z
        .string()
        .trim()
        .min(1, { message: 'Business Name is required.' })
        .min(3, { message: 'Business Name must be at least 3 characters.' })
        .max(20, { message: "Business Name can't exceed 14 characters." }),
    business_category: z
        .string()
        .min(1, { message: 'Select a business category.' }),
    business_hours: z.string(),
});
type FormData = z.infer<typeof formSchema>;

// Component.
export default function NameCategoryHours({
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

    const [fromHours, setFromHours] = useState('');
    const [toHours, setToHours] = useState('');

    // Fetching and storing company categories.
    const [categories, setCategories] = useState<any>([]);
    useEffect(() => {
        (async function () {
            try {
                const { data } = await Api.get(
                    '/api/users/business/categories/get-all-categories'
                );

                if (!data.status) throw new Error();

                setCategories(data.categories);
            } catch {
                form.setError('business_category', {
                    type: 'Server Error',
                    message: 'No categories available at the moment.',
                });
            }
        })();
    }, []);

    const onSubmit: SubmitHandler<FormData> = function (data) {
        Object.keys(data).forEach((_, index) => {
            dispatch({
                fieldName: Object.keys(data)[index],
                fieldValue: Object.values(data)[index],
            });
        });

        if (fromHours !== '' && toHours !== '') {
            dispatch({
                fieldName: 'business_hours',
                fieldValue: `${fromHours} to ${toHours}`,
            });
        }
        // Going to the next step.
        nextStep();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Business Name */}
                <FormField
                    control={form.control}
                    name="business_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Business Name</FormLabel>

                            <FormControl>
                                <Input {...field} placeholder="Royal Taj" />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Business Category */}
                <FormField
                    control={form.control}
                    name="business_category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Business Category</FormLabel>

                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories.map((category: any) => (
                                        <SelectItem
                                            key={category._id}
                                            value={category._id}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Business Hours */}
                <div className="w-full flex justify-between align-center">
                    <FormField
                        control={form.control}
                        name="business_hours"
                        render={({ field }) => (
                            <FormItem className="w-full flex flex-col">
                                <FormLabel>Business Hours</FormLabel>

                                <div className="w-full flex justify-between">
                                    <Select
                                        onValueChange={(value) =>
                                            setFromHours(value)
                                        }
                                        defaultValue={fromHours}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="From" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="max-h-[200px]">
                                            {Array(24)
                                                .fill('')
                                                .map((_, index) => (
                                                    <SelectItem
                                                        key={`from${index}`}
                                                        value={index.toString()}
                                                    >
                                                        {index}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>

                                    <span className="h-fit mx-2 grid place-items-center text-2xl">
                                        -
                                    </span>

                                    <Select
                                        onValueChange={(value) =>
                                            setToHours(value)
                                        }
                                        defaultValue={toHours}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="To" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="max-h-[200px]">
                                            {Array(24)
                                                .fill('')
                                                .map((_, index) => (
                                                    <SelectItem
                                                        key={`to${index}`}
                                                        value={index.toString()}
                                                    >
                                                        {index}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>

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
