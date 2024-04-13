'use client';

// Lib Imports.
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaUser, FaBusinessTime, FaArrowRight } from 'react-icons/fa';

// Local Imports.
import { Button } from './ui/button';

// Types.
const formSchema = z.object({
    account_type: z.string(),
});
type FormData = z.infer<typeof formSchema>;

// Component.
export default function SignUpForm() {
    // React Hook Form Config.
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit: SubmitHandler<FormData> = function (data) {
        console.table(data);
    };

    return (
        <form className="w-full flex-1 py-4" onSubmit={handleSubmit(onSubmit)}>
            <section className="w-full h-full flex flex-col justify-around items-center">
                <h2 className="text-slate-500 text-xl font-medium">
                    Account Type
                </h2>

                {errors.account_type && (
                    <span className="text-red-500">
                        {errors.account_type.message}
                    </span>
                )}
                <div className="w-full flex gap-4 px-4">
                    {/* Hidden radio inputs for choice functionality. */}
                    <input
                        {...register('account_type')}
                        type="radio"
                        value="individual"
                        id="choice_1"
                        className="hidden peer/choice1"
                    />
                    <input
                        {...register('account_type')}
                        type="radio"
                        value="business"
                        id="choice_2"
                        className="hidden peer/choice2"
                    />

                    {/* Labels for the inputs | Visible choices */}
                    <label
                        htmlFor="choice_1"
                        className="w-full aspect-square flex flex-col justify-center items-center gap-2 p-2 rounded-lg shadow-[0_0_0.5rem_rgba(0,_0,_0,_0.15)] *:fill-slate-600 *:text-slate-600 opacity-50 peer-checked/choice1:choice-card-active  selection:bg-none hover:cursor-pointer"
                    >
                        <FaUser size={24} className="fill-slate-600" />
                        <span className="text-slate-600 text-md tracking-wide">
                            Individual
                        </span>
                    </label>

                    <label
                        htmlFor="choice_2"
                        className="w-full aspect-square flex flex-col justify-center items-center gap-2 p-2 rounded-lg shadow-[0_0_0.5rem_rgba(0,_0,_0,_0.15)] *:fill-slate-600 *:text-slate-600 opacity-50 peer-checked/choice2:choice-card-active  selection:bg-none hover:cursor-pointer"
                    >
                        <FaBusinessTime size={24} className="" />
                        <span className="text-md tracking-wide font-medium">
                            Business
                        </span>
                    </label>
                </div>

                <Button type="button" className="primary-gradiant">
                    Next <FaArrowRight className="ml-1" size={12} />
                </Button>
            </section>
        </form>
    );
}
