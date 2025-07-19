import $api from "@/shared/api";

// const API_URL = import.meta.env.VITE_BASE_URL as string

export const getSchedules = async () => {
  const response = await $api.get(`schedules/`);
  return response.data;
};

export const patchSchedule = async (id: string | number, data: any) => {
  const response = await $api.patch(`schedules/${id}/`, data);
  return response.data;
};

export const getSubjects = async () => {
  const response = await $api.get("schedules/subjects/");
  return response.data;
};

export const getLessonTypes = async () => {
  const response = await $api.get("schedules/lesson-types/");
  return response.data;
};

export const getLessonTimes = async () => {
  const response = await $api.get("schedules/lesson-times/");
  return response.data;
};
