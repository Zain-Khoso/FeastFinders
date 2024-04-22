'use client';

// Lib Imports.
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaArrowRight, FaArrowLeft, FaSort, FaCheck } from 'react-icons/fa';

// Local Imports.
import countries from '@/data/countries.json';
import type { State, Action } from './individual/reducer';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandList,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';

// Types.
type Props = {
    defaultValues: State;
    dispatch: React.Dispatch<Action>;
    nextStep: () => void;
    prevStep: () => void;
};

const formSchema = z.object({
    country: z.string({ required_error: 'Tell us where you are from.' }),
    city: z.string({ required_error: 'Tell us where do you live.' }),
});
type FormData = z.infer<typeof formSchema>;

// Component.
export default function EmailPhoneCountryCity({
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
                {/* Country */}
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            {form.formState.errors.country ? (
                                <FormMessage />
                            ) : (
                                <FormLabel>Country</FormLabel>
                            )}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={`justify-between ${
                                                !field.value
                                                    ? 'text-muted-foreground'
                                                    : ''
                                            }`}
                                        >
                                            {field.value
                                                ? countries.find(
                                                      (country) =>
                                                          country.name ===
                                                          field.value
                                                  )?.name
                                                : 'Select country'}
                                            <FaSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>

                                <PopoverContent className="p-0">
                                    <Command className='max-h-[200px]'>
                                        <CommandInput placeholder="Search country..." />
                                        <CommandEmpty>
                                            No country found.
                                        </CommandEmpty>

                                        <CommandList>
                                            <CommandGroup>
                                                {countries.map((country) => (
                                                    <CommandItem
                                                        value={country.name}
                                                        key={country.name}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                'country',
                                                                country.name
                                                            );
                                                        }}
                                                    >
                                                        <FaCheck
                                                            className={
                                                                'mr-2 h-4 w-4' +
                                                                    country.name ===
                                                                field.value
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0'
                                                            }
                                                        />
                                                        {country.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )}
                />

                {/* City */}
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            {form.formState.errors.city ? (
                                <FormMessage />
                            ) : (
                                <FormLabel>City</FormLabel>
                            )}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={`justify-between ${
                                                !field.value
                                                    ? 'text-muted-foreground'
                                                    : ''
                                            }`}
                                        >
                                            {field.value
                                                ? countries.find(
                                                      (city) =>
                                                          city.name ===
                                                          field.value
                                                  )?.name
                                                : 'Select city'}
                                            <FaSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>

                                <PopoverContent className="p-0">
                                    <Command className='max-h-[200px]'>
                                        <CommandInput placeholder="Search city..." />
                                        <CommandEmpty>
                                            No city found.
                                        </CommandEmpty>

                                        <CommandList>
                                            <CommandGroup>
                                                {countries.map((city) => (
                                                    <CommandItem
                                                        value={city.name}
                                                        key={city.name}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                'city',
                                                                city.name
                                                            );
                                                        }}
                                                    >
                                                        <FaCheck
                                                            className={
                                                                'mr-2 h-4 w-4' +
                                                                    city.name ===
                                                                field.value
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0'
                                                            }
                                                        />
                                                        {city.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
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