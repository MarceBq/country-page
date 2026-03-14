
import { useEffect, useState } from "react";
import { useCountriesStore } from "./store/countriesStore";
import "./styles/style.css";
import { ClipLoader } from "react-spinners";
import { CountryTable } from "./components/CountryTable";
import { columns } from "./components/Columns";

function App() {
  const { loading, fetchCountries, filteredCountries, filterCountries } =
    useCountriesStore();

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchCountries();
    }, 2000);
  }, [fetchCountries]);

  useEffect(() => {
    filterCountries(searchTerm);
  }, [searchTerm, filterCountries]);

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
            className=" w-[300px] bg-gray-700 px-4 py-2 rounded-lg outline-none"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>

        <div className="h-80 bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="bg-amber-200 p-3 m-5">
             className="space-y-2">
        <p className="text-sm text-zinc-400">Sort by</p>

        <Select defaultValue="population">
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="population">Population</SelectItem>
            <SelectItem value="area">Area</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Region */}
      <div className="space-y-3">
        <p className="text-sm text-zinc-400">Region</p>

        <ToggleGroup
          type="multiple"
          className="flex flex-wrap gap-2"
        >
          <ToggleGroupItem value="americas">Americas</ToggleGroupItem>
          <ToggleGroupItem value="antarctic">Antarctic</ToggleGroupItem>
          <ToggleGroupItem value="africa">Africa</ToggleGroupItem>
          <ToggleGroupItem value="asia">Asia</ToggleGroupItem>
          <ToggleGroupItem value="europe">Europe</ToggleGroupItem>
          <ToggleGroupItem value="oceania">Oceania</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Status */}
      <div className="space-y-3">
        <p className="text-sm text-zinc-400">Status</p>

        <div className="flex items-center space-x-2">
          <Checkbox id="un" />
          <label htmlFor="un" className="text-sm">
            Member of the United Nations
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="independent" defaultChecked />
          <label htmlFor="independent" className="text-sm">
            Independent
          </label>
        </div>
      </div>

          </div>

          {loading ? (
            <ClipLoader color="#03045E" size={50} />
          ) : (
            <div className="text-gray-400">
              <CountryTable data={filteredCountries} columns={columns} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
