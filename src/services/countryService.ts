import { api } from "../api/axios";

export const getAllCountries = async () => {
  const { data } = await api.get(
    "/all?fields=name,flags,population,area,region",
  );

  return data;
};
