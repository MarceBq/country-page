import { useEffect } from "react";
import { useCountriesStore } from "./store/countriesStore";
import "./styles/style.css";
import { ClipLoader } from "react-spinners";
import { CountryTable } from "./components/CountryTable";
import { columns } from "./components/Columns";

import { Checkbox } from "./components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";

function App() {
  const {
    loading,
    fetchCountries,
    filteredCountries,
    applyFilters,
    setSearchTerm,
    setToggleRegion,
    setUnMember,
    setIndependent,
    setSort,
    filters,
  } = useCountriesStore();

  useEffect(() => {
    setTimeout(() => {
      fetchCountries();
    }, 2000);
  }, [fetchCountries]);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  console.log(filters.regions);

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      <div className="w-full h-[40vh] bg-[url('/hero-image.jpg')] bg-cover bg-center flex items-center justify-center">
        <img src="/Logo.svg" className="w-[200px]" />
      </div>

      <div className="w-[85%] max-w-6xl mx-auto -mt-24 rounded-xl bg-gray-800/90 backdrop-blur-md shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">
            Found {filteredCountries.length} countries
          </h2>

          <input
            type="text"
            placeholder="Search by Name, Region, Population"
            className="w-[300px] bg-gray-700 px-4 py-2 rounded-lg outline-none"
            value={filters.searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-[250px_1fr] gap-8">
          <div className="space-y-6">
            <div>
              <p className="text-sm text-zinc-400 mb-2">Sort by</p>

              <Select
                defaultValue="population"
                onValueChange={(value) =>
                  setSort(value as "population" | "area")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="population">Population</SelectItem>
                  <SelectItem value="area">Area</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-zinc-400">Region</p>

              <ToggleGroup
                type="multiple"
                className="flex flex-wrap gap-2"
                onValueChange={(regions) => {
                  setToggleRegion(regions);
                }}
              >
                <ToggleGroupItem value="americas">Americas</ToggleGroupItem>
                <ToggleGroupItem value="antarctic">Antarctic</ToggleGroupItem>
                <ToggleGroupItem value="africa">Africa</ToggleGroupItem>
                <ToggleGroupItem value="asia">Asia</ToggleGroupItem>
                <ToggleGroupItem value="europe">Europe</ToggleGroupItem>
                <ToggleGroupItem value="oceania">Oceania</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-zinc-400">Status</p>

              <div className="flex items-center space-x-2">
                <Checkbox id="un"  onCheckedChange={(value) => setUnMember(!!value)} />
                <label htmlFor="un" className="text-sm">
                  Member of the United Nations
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="independent" onCheckedChange={(value) => setIndependent(!!value)} defaultChecked />
                <label htmlFor="independent" className="text-sm">
                  Independent
                </label>
              </div>
            </div>
          </div>

          <div>
            {loading ? (
              <div className="flex justify-center items-center h-60">
                <ClipLoader color="#03045E" size={50} />
              </div>
            ) : (
              <div className="text-gray-400">
                <CountryTable data={filteredCountries} columns={columns} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
