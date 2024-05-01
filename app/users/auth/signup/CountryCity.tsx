'use client';

// Lib Imports.
import Image from 'next/image';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaArrowRight, FaArrowLeft, FaSort, FaCheck } from 'react-icons/fa';

// Local Imports.
import countries from '@/data/countries.json';
import citiesData from '@/data/cities.json';
import type {
    State as IndividualState,
    Action as IndividualAction,
} from './individual/reducer';
import type {
    State as BusinessState,
    Action as BusinessAction,
} from './business/reducer';
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
    defaultValues: IndividualState | BusinessState;
    dispatch: React.Dispatch<IndividualAction | BusinessAction>;
    nextStep: () => void;
    prevStep: () => void;
};

const formSchema = z.object({
    country: z.string().min(1, { message: 'Country is required.' }),
    city: z.string().min(1, { message: 'City is required.' }),
});
type FormData = z.infer<typeof formSchema>;

// Static Data.
const cities: any = citiesData;

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
                            <FormLabel>Country</FormLabel>

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
                                            <div className="flex items-center gap-2">
                                                {field.value && (
                                                    <Image
                                                        alt=""
                                                        src={
                                                            countries.find(
                                                                (country) =>
                                                                    country.name ===
                                                                    field.value
                                                            )?.file_url || ''
                                                        }
                                                        width={30}
                                                        height={30}
                                                    />
                                                )}
                                                {field.value ||
                                                    'Select country'}
                                            </div>
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
                                                {countries.map((country) => (
                                                    <CommandItem
                                                        value={country.name}
                                                        key={country.alpha3}
                                                        onSelect={() => {
                                                            form.setValue(
                                                                'country',
                                                                country.name
                                                            );
                                                            form.setValue(
                                                                'city',
                                                                ''
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
                                                        <Image
                                                            alt=""
                                                            src={`https:${country.file_url}`}
                                                            width={20}
                                                            height={20}
                                                            className="mr-2"
                                                        />
                                                        {country.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* City */}
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>City</FormLabel>

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
                                            {field.value || 'Select city'}
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
                                                {cities
                                                    .find(
                                                        (country: any) =>
                                                            country.iso3 ===
                                                            countries.find(
                                                                (country) =>
                                                                    country.name ===
                                                                    form.watch(
                                                                        'country'
                                                                    )
                                                            )?.alpha3
                                                    )
                                                    ?.cities.map(
                                                        (city: any) => (
                                                            <CommandItem
                                                                value={
                                                                    city.name
                                                                }
                                                                key={city.id}
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
                                                        )
                                                    )}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <FormMessage />
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
