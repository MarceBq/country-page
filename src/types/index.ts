export type Country = {
    name: {
        common: string;
    };
    flags: {
        png: string;
    };
    population: number;
    area: number;
    region: string;
    unMember: boolean;
    independent: boolean;
}

export type Filters = {
    searchTerm: string;
    regions: string[];
    unMember: boolean;
    independent: boolean;
    sortBy: "population" | "area";
}

export type CountryTable = Omit<Country, "unMember" | "independent">
