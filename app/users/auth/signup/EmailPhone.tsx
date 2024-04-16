'use client';

// Lib Imports.
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// Local Imports.
import type { State, Action } from './individual/reducer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Types.
type Props = {
    defaultValues: State;
    dispatch: React.Dispatch<Action>;
    nextStep: () => void;
};

const formSchema = z.object({
    email: z.string().email({ message: 'Invalid Email Address' }),
    phone: z
        .string()
        .regex(/^(\+?\d{1,3})?[-. (]?\d{3}[-. )]?\d{3}[-. ]?\d{4}$/, {
            message: 'Invalid Phone',
        }),
});
type FormData = z.infer<typeof formSchema>;

export default function EmailPhone({
    defaultValues,
    dispatch,
    nextStep,
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
            <h2 className="text-slate-500 text-xl font-medium">
                Email & Phone
            </h2>

            <div className="w-full flex flex-col gap-2 px-2">
                {errors.email && (
                    <span className="text-sm text-red-400">
                        {errors.email.message}
                    </span>
                )}
                <Input
                    {...register('email')}
                    placeholder="Email"
                    style={{ outlineWidth: '0px !important' }}
                    className="w-full focus-visible:ring-1 focus-visible:ring-offset-1"
                />

                {errors.phone && (
                    <span className="text-sm text-red-400">
                        {errors.phone.message}
                    </span>
                )}
                <Controller
                    control={control}
                    name="phone"
                    render={({ field: { ref, ...field } }) => (
                        <PhoneInput
                            {...field}
                            inputProps={{ ref }}
                            country={'pk'}
                            specialLabel={'Personal Mobile Number'}
                            inputClass="max-w-full"
                        />
                    )}
                />
            </div>

            <Button className="primary-gradiant">
                Next <FaArrowRight className="ml-1" size={12} />
            </Button>
        </form>
    );
}
