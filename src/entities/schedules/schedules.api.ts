import $api from "@/shared/api";

// const API_URL = import.meta.env.VITE_BASE_URL as string

export const getSchedules = async () => {
  const response = await $api.get(`schedules/`);
  return response.data;
};
