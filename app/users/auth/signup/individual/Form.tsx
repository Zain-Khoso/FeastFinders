'use client';

// Lib Imports.
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaUser, FaBusinessTime, FaArrowRight } from 'react-icons/fa';

// Local Imports.
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Types.
const formSchema = z.object({
    email: z.string().email(),
    username: z.string().min(6).max(16),
});
type FormData = z.infer<typeof formSchema>;

// Component.
export default function Form() {
    // React Hook Form Config.
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit: SubmitHandler<FormData> = function (data) {
        console.table({ message: 'Hello Wolrd', ...data });
    };

    return (
        <form className="w-full flex-1 py-4" onSubmit={handleSubmit(onSubmit)}>
            <section className="w-full h-full flex flex-col justify-around items-center">
                <h2 className="text-slate-500 text-xl font-medium">
                    Email & Username
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
                </div>

                <Button className="primary-gradiant">
                    Next <FaArrowRight className="ml-1" size={12} />
                </Button>
            </section>
        </form>
    );
}
