'use client';

// Lib Imports.
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Input } from '@/components/ui/input';

// Local Imports.
import type { State, Action } from './individual/reducer';
import { Button } from '@/components/ui/button';

// Types.
type Props = {
    defaultValues: State;
    dispatch: React.Dispatch<Action>;
    nextStep: () => void;
    prevStep: () => void;
};

const formSchema = z
    .object({
        username: z
            .string()
            .refine((username) => /^[a-zA-Z0-9-]{4,14}$/.test(username), {
                message: 'Invalid Username',
            }),
        password: z
            .string()
            .min(8, { message: 'Password must contain atleast 8 characters.' })
            .max(30, { message: 'Password can atmost contain 30 characters.' }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.confirmPassword === data.password, {
        message: 'Should be same as Password.',
        path: ['confirmPassword'],
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
                {errors.username && (
                    <span className="text-sm text-red-400">
                        {errors.username.message}
                    </span>
                )}
                <Input
                    {...register('username')}
                    placeholder="Username"
                    style={{ outlineWidth: '0px !important' }}
                    className="w-full focus-visible:ring-1 focus-visible:ring-offset-1"
                />

                {errors.password && (
                    <span className="text-sm text-red-400">
                        {errors.password.message}
                    </span>
                )}
                <Input
                    {...register('password')}
                    placeholder="Password"
                    style={{ outlineWidth: '0px !important' }}
                    className="w-full focus-visible:ring-1 focus-visible:ring-offset-1"
                />

                {errors.confirmPassword && (
                    <span className="text-sm text-red-400">
                        {errors.confirmPassword.message}
                    </span>
                )}
                <Input
                    {...register('confirmPassword')}
                    placeholder="Confirm Password"
                    style={{ outlineWidth: '0px !important' }}
                    className="w-full focus-visible:ring-1 focus-visible:ring-offset-1"
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
