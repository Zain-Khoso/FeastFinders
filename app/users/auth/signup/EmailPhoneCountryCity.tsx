'use client';

// Lib Imports.
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaArrowRight, FaSort, FaCheck } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandList,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
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
    phone: z.string().min(1, { message: 'A phone number is required.' }),
    country: z.string().min(1, { message: 'A country is required.' }),
    city: z.string().min(1, { message: 'A city is required.' }),
});
type FormData = z.infer<typeof formSchema>;

const countries = [
    { label: 'Pakistan', value: 'pakistan' },
    { label: 'Iran', value: 'iran' },
    { label: 'Afghanistan', value: 'afghanistan' },
    { label: 'USA', value: 'usa' },
    { label: 'UK', value: 'uk' },
    { label: 'Russia', value: 'russia' },
    { label: 'Japan', value: 'japan' },
    { label: 'Korea', value: 'korea' },
    { label: 'China', value: 'china' },
];

const cities = [
    { label: 'Sukkur', value: 'sukkur' },
    { label: 'Shikarpur', value: 'shikarpur' },
    { label: 'Karachi', value: 'karachi' },
    { label: 'Pishawar', value: 'pishawar' },
    { label: 'Quetta', value: 'quetta' },
    { label: 'Larkana', value: 'larkana' },
    { label: 'Mohin-Jo-Daro', value: 'mohin-jo-daro' },
    { label: 'Islamabad', value: 'islamabad' },
    { label: 'rawal-Pindi', value: 'rawal-pindi' },
];

export default function EmailPhoneCountryCity({
    defaultValues,
    dispatch,
    nextStep,
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
                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            {form.formState.errors.email ? (
                                <FormMessage />
                            ) : (
                                <FormLabel>Email</FormLabel>
                            )}
                            <FormControl>
                                <Input
                                    placeholder="xyz@example.com"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Phone */}
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field: { ref, ...field } }) => (
                        <FormItem>
                            {form.formState.errors.phone ? (
                                <FormMessage />
                            ) : (
                                <FormLabel>Phone</FormLabel>
                            )}
                            <FormControl>
                                <PhoneInput
                                    {...field}
                                    inputProps={{ ref }}
                                    country={'pk'}
                                    inputClass="!h-10 !w-full !rounded-md !border !border-input !text-sm !ring-offset-background !focus-visible:outline-none !focus-visible:border-2 !focus-visible:border-slate-900 !disabled:cursor-not-allowed !disabled:opacity-50"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

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
                                            className={`justify-between
                                                ${
                                                    !field.value
                                                        ? ''
                                                        : 'text-muted-foreground'
                                                }`}
                                        >
                                            {field.value
                                                ? countries.find(
                                                      (country) =>
                                                          country.value ===
                                                          field.value
                                                  )?.label
                                                : 'Select a country'}
                                            <FaSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="Search Country..."
                                            className="h-9"
                                        />
                                        <CommandEmpty>
                                            No countries found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            <CommandList className="max-h-[200px]">
                                                {countries.map((country) => (
                                                    <CommandItem
                                                        value={country.label}
                                                        key={country.value}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                'country',
                                                                country.value
                                                            );
                                                        }}
                                                    >
                                                        {country.label}
                                                        <FaCheck
                                                            className={`
                                                            ml-auto h-4 w-4
                                                            ${
                                                                country.value ===
                                                                field.value
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0'
                                                            }
                                                        `}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandList>
                                        </CommandGroup>
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
                                            className={`justify-between
                                                ${
                                                    !field.value
                                                        ? ''
                                                        : 'text-muted-foreground'
                                                }`}
                                        >
                                            {field.value
                                                ? cities.find(
                                                      (city) =>
                                                          city.value ===
                                                          field.value
                                                  )?.label
                                                : 'Select a city'}
                                            <FaSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="Search a city..."
                                            className="h-9"
                                        />
                                        <CommandEmpty>
                                            No cities found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            <CommandList className="max-h-[200px]">
                                                {cities.map((city) => (
                                                    <CommandItem
                                                        value={city.label}
                                                        key={city.value}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                'city',
                                                                city.value
                                                            );
                                                        }}
                                                    >
                                                        {city.label}
                                                        <FaCheck
                                                            className={`
                                                            ml-auto h-4 w-4
                                                            ${
                                                                city.value ===
                                                                field.value
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0'
                                                            }
                                                        `}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandList>
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )}
                />

                <div className="flex justify-center items-center gap-4">
                    <Button className="primary-gradiant">
                        Next <FaArrowRight className="ml-1" size={12} />
                    </Button>
                </div>
            </form>
        </Form>
    );
}
