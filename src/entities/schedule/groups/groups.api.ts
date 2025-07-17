import $api from "@/shared/api";

// const API_URL = import.meta.env.VITE_BASE_URL as string

export const getSchedulesGroups = async () => {
  const response = await $api.get(`schedules/groups/`);
  return response.data;
};
