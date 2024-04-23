'use client';

// Lib Imports.
import { date, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaArrowRight, FaArrowLeft, FaCalendar } from 'react-icons/fa';

// Local Imports.
import type { State, Action } from './reducer';
import { format } from 'date-fns';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

// Types.
type Props = {
    defaultValues: State;
    dispatch: React.Dispatch<Action>;
    nextStep: () => void;
    prevStep: () => void;
};

const formSchema = z.object({
    gender: z.enum(['male', 'female'], {
        required_error: 'Please select a gender.',
    }),
    dob: z.string(),
});
type FormData = z.infer<typeof formSchema>;

// Component.
export default function GenderDOB({
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
        console.log(data.dob);
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
                {/* DOB */}
                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            {form.formState.errors.dob ? (
                                <FormMessage />
                            ) : (
                                <FormLabel>Date of birth</FormLabel>
                            )}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={'outline'}
                                            className={`pl-3 text-left font-normal${
                                                !field.value &&
                                                'text-muted-foreground'
                                            }`}
                                        >
                                            {field.value ? (
                                                format(field.value, 'PPP')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <FaCalendar className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>

                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(value: any) =>
                                            form.setValue(
                                                'dob',
                                                new Date(value).toDateString()
                                            )
                                        }
                                        disabled={(date: any) =>
                                            date > new Date() ||
                                            date < new Date('1900-01-01')
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )}
                />

                {/* Gender */}
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            {form.formState.errors.gender ? (
                                <FormMessage />
                            ) : (
                                <FormLabel>Gender</FormLabel>
                            )}
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-x-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="male" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Male
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="female" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Female
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
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
