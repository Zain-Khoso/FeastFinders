'use client';

// Lib Imports.
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaArrowRight, FaArrowLeft, FaSort, FaCheck } from 'react-icons/fa';

// Local Imports.
import { getCountriesAndCities } from '@/utils/getStaticData';
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
    country: z.string({ required_error: 'Country is required.' }),
    city: z.string({ required_error: 'City is required.' }),
});
type FormData = z.infer<typeof formSchema>;

// Data.
const data = getCountriesAndCities();

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
                                                ? Object.keys(data).find(
                                                      (key: any) =>
                                                          key === field.value
                                                  )
                                                : 'Select country'}
                                            <FaSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>

                                <PopoverContent className="p-0">
                                    <Command className="max-h-[200px]">
                                        <CommandInput placeholder="Search country..." />
                                        <CommandEmpty>
                                            No country found.
                                        </CommandEmpty>

                                        <CommandList>
                                            <CommandGroup>
                                                {Object.keys(data).map(
                                                    (country: any) => (
                                                        <CommandItem
                                                            value={country}
                                                            key={country}
                                                            onSelect={() => {
                                                                form.setValue(
                                                                    'country',
                                                                    country
                                                                );
                                                            }}
                                                        >
                                                            <FaCheck
                                                                className={
                                                                    'mr-2 h-4 w-4' +
                                                                        country ===
                                                                    field.value
                                                                        ? 'opacity-100'
                                                                        : 'opacity-0'
                                                                }
                                                            />
                                                            {country}
                                                        </CommandItem>
                                                    )
                                                )}
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
                                                ? data[
                                                      form.watch('country')
                                                  ]?.find(
                                                      (city: any) =>
                                                          city === field.value
                                                  ) || 'Select city'
                                                : 'Select city'}
                                            <FaSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>

                                <PopoverContent className="p-0">
                                    <Command className="max-h-[200px]">
                                        <CommandInput placeholder="Search city..." />
                                        <CommandEmpty>
                                            No city found.
                                        </CommandEmpty>

                                        <CommandList>
                                            <CommandGroup>
                                                {data[
                                                    form.watch('country')
                                                ]?.map((city: any) => (
                                                    <CommandItem
                                                        value={city}
                                                        key={city}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                'city',
                                                                city
                                                            );
                                                        }}
                                                    >
                                                        <FaCheck
                                                            className={
                                                                'mr-2 h-4 w-4' +
                                                                    city ===
                                                                field.value
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0'
                                                            }
                                                        />
                                                        {city}
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
