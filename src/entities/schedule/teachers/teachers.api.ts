import $api from "@/shared/api";

// const API_URL = import.meta.env.VITE_BASE_URL as string

export const getSchedulesTeachers = async () => {
  const response = await $api.get(`schedules/teachers/`);
  return response.data;
};
