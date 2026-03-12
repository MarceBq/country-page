import { create } from "zustand";
import type { Country } from "../types";
import { getAllCountries } from "../services/countryService";

type CountryState = {
  countries: Country[];
  loading: boolean;
  filteredCountries: Country[];
  fetchCountries: () => Promise<void>;
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
}));
