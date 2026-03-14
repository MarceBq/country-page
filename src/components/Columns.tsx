import { createColumnHelper } from "@tanstack/react-table";
import type { CountryTable } from "../types";

const columnHelper = createColumnHelper<CountryTable>();

export const columns = [
  columnHelper.accessor("flags.png", {
    header: "Flag",
    cell: (info) => (
      <img src={info.getValue()} className="w-8 h-6 object-cover" />
    ),
  }),
  columnHelper.accessor("name.common", {
    header: "Country",
    
  }),

  columnHelper.accessor("population", {
    header: "Population",
    cell: (info) => info.getValue().toLocaleString(),
  }),

  columnHelper.accessor("area", {
    header: "Area (km²)",
    cell: (info) => info.getValue().toLocaleString(),
  }),

  columnHelper.accessor("region", {
    header: "Region",
  }),
];
