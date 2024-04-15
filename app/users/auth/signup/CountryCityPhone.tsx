'use client';

// Lib Imports.
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// Local Imports.
import type { State, Action } from './individual/reducer';
import { Button } from '@/components/ui/button';
import { ChangeEvent } from 'react';

// Types.
type Props = {
    defaultValues: State;
    dispatch: React.Dispatch<Action>;
    nextStep: () => void;
    prevStep: () => void;
};

const formSchema = z.object({
    country: z.string().trim().min(1, { message: 'Required' }),
    city: z.string().trim().min(1, { message: 'Required' }),
    phone: z.string(),
});
type FormData = z.infer<typeof formSchema>;

export default function CountryCityPhone({
    defaultValues,
    dispatch,
    nextStep,
    prevStep,
}: Props) {
    // React Hook Form Config.
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({
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
        <form
            className="flex-1 w-full flex flex-col justify-around items-center py-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className="text-slate-500 text-xl font-medium">Tell Us More</h2>

            <div className="w-full flex flex-col gap-2 px-2">
                {errors.country && (
                    <span className="text-sm text-red-400">
                        {errors.country.message}
                    </span>
                )}
                <select
                    {...register('country')}
                    defaultValue=""
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-offset-1"
                >
                    <option value="" className="hidden">
                        Country
                    </option>
                    <option value="pakistan">Pakistan</option>
                    <option value="china">China</option>
                    <option value="russia">Russia</option>
                </select>

                {errors.city && (
                    <span className="text-sm text-red-400">
                        {errors.city.message}
                    </span>
                )}
                <select
                    {...register('city')}
                    defaultValue=""
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-offset-1"
                >
                    <option value="" className="hidden">
                        City
                    </option>
                    <option value="sukkur">Sukkur</option>
                    <option value="karachi">Karachi</option>
                    <option value="shikarpur">Shikarpur</option>
                </select>

                {errors.phone && (
                    <span className="text-sm text-red-400">
                        {errors.phone.message}
                    </span>
                )}
                <Controller
                    control={control}
                    name="phone"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                        <ReactPhoneInput
                            {...field}
                            inputProps={{
                                ref,
                                required: true,
                            }}
                            country={'pk'}
                            specialLabel={'Individual Mobile Number'}
                            inputClass="max-w-full"
                        />
                    )}
                />
            </div>

            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    onClick={prevStep}
                    className=" text-slate-500"
                >
                    <FaArrowLeft className="mr-1 text-slate-500" size={12} /> Go
                    Back
                </Button>

                <Button className="primary-gradiant">
                    Next <FaArrowRight className="ml-1" size={12} />
                </Button>
            </div>
        </form>
    );
}
