// Imports.
import untypedData from '@/data/cities.json';

const data: any = untypedData;

export function getCountriesAndCities(): any {
    const result: any = {};

    data.forEach((country: any) => {
        result[country.name] = country.cities.map((city: any) => city.name);
    });

    return result;
}
