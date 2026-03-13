import { create } from "zustand";
import type { Country } from "../types";
import { getAllCountries } from "../services/countryService";

type CountryState = {
  countries: Country[];
  loading: boolean;
  filteredCountries: Country[];

  fetchCountries: () => Promise<void>;
  filterCountries: (term: string) => void;
};

export const useCountriesStore = create<CountryState>((set, get) => ({
  countries: [],
  loading: true,
  filteredCountries: [],


  fetchCountries: async () => {
    set({ loading: true });

    const data = await getAllCountries();

    set({
      countries: data,
      filteredCountries: data,
      loading: false,
    });
  },

  filterCountries: (term: string) => {
     
    
    const { countries } = get();

    const filtered = countries.filter((country) => {
      return (
        country.name.common.toLowerCase().includes(term.toLowerCase()) || 
        country.region.toLowerCase().includes(term.toLowerCase()) ||
        country.population.toString().includes(term)   
      );

    });

    set({ filteredCountries: filtered });
  },
}));
