import $api from "@/shared/api";

// const API_URL = import.meta.env.VITE_BASE_URL as string

export const getSchedulesGroups = async (id: number | null) => {
  const response = await $api.get(`schedules/groups/`, {
    params: {
      educationLevel: id,
    },
  });
  return response.data;
};
