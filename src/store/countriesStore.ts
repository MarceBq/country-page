import { create } from "zustand";
import type { Country, Filters } from "../types";
import { getAllCountries } from "../services/countryService";

type CountryState = {
  countries: Country[];
  filteredCountries: Country[];
  filters: Filters;

  loading: boolean;

  fetchCountries: () => Promise<void>;

  setSearchTerm: (term: string) => void;
  setToggleRegion: (region: string[]) => void;
  setSort: (sortTerm: "population" | "area") => void;
  setUnMember: (value: boolean) => void;
  setIndependent: (value: boolean) => void;

  applyFilters: () => void;
};

export const useCountriesStore = create<CountryState>((set, get) => ({
  countries: [],
  filteredCountries: [],
  filters: {
    searchTerm: "",
    regions: [],
    unMember: false,
    independent: false,
    sortBy: "population",
  },

  loading: true,

  fetchCountries: async () => {
    set({ loading: true });

    const data = await getAllCountries();

    set({
      countries: data,
      filteredCountries: data,
      loading: false,
    });
  },

  setSearchTerm: (term: string) => {
    set((state) => ({
      filters: {
        ...state.filters,
        searchTerm: term,
      },
    }));
  },

  setToggleRegion: (regions: string[]) => {
    set((state) => ({
      filters: {
        ...state.filters,
        regions: regions,
      },
    }));
  },

  setSort: (sortTerm: "population" | "area") => {
    set((state) => ({
      filters: {
        ...state.filters,
        sortBy: sortTerm,
      },
    }));
  },

  setUnMember: (value: boolean) => {
    set((state) => ({
      filters: {
        ...state.filters,
        unMember: value,
      },
    }));
  },

  setIndependent: (value: boolean) => {
    set((state) => ({
      filters: {  
        ...state.filters,
        independent: value,
      },
    }));
  },

  applyFilters: () => {
    const { countries, filters } = get();

    let filtered = [...countries];

    if (filters.searchTerm) {
      filtered = filtered.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()),
      );
    }

    if (filters.regions.length > 0) {
      filtered = filtered.filter((country) =>
        filters.regions.includes(country.region.toLocaleLowerCase()),
      );
    }

    if (filters.sortBy === "population") {
      filtered.sort((a, b) => b.population - a.population);
    }

    if (filters.sortBy === "area") {
      filtered.sort((a, b) => (b.area ?? 0) - (a.area ?? 0));
    }

    if (filters.unMember) {
      filtered = filtered.filter(
        (country) => country.unMember
      );
    }

    if(filters.independent) {
      filtered = filtered.filter(
        (country) => country.independent
      );
    }

    set({ filteredCountries: filtered });
  },
}));
