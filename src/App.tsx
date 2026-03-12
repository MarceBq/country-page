import { useEffect } from "react";
import { useCountriesStore } from "./store/countriesStore";
import "./styles/style.css";
import { ClipLoader } from "react-spinners";


function App() {
  const { countries, loading, fetchCountries, filteredCountries } =
    useCountriesStore();

  useEffect(() => {
    setTimeout(() => {
      fetchCountries();
    }, 2000);
  }, []);

  

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white">
      <div className="w-full h-[40vh] bg-[url('/hero-image.jpg')] bg-cover bg-center flex items-center justify-center">
        <img src="/Logo.svg" className="w-[200px]" />
      </div>

      <div className="w-[85%] max-w-6xl mx-auto -mt-24 rounded-xl bg-gray-800/90 backdrop-blur-md shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Found 234 countries</h2>

          <input
            type="text"
            placeholder="Search by Name, Region, Subregion"
            className="bg-gray-700 px-4 py-2 rounded-lg outline-none"
          />
        </div>

        <div className="h-80 bg-gray-700 rounded-lg flex items-center justify-center">
          {loading ? (
              <ClipLoader color="#03045E" size={50} />
          ) : (
            <p className="text-gray-400">
              {filteredCountries
                .map((country) => country.name.common)
                .join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
