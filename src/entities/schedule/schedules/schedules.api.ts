import $api from "@/shared/api";

// const API_URL = import.meta.env.VITE_BASE_URL as string

export const getMentorSchedule = async () => {
  const response = await $api.get(`mentor/schedule/`);
  return response.data;
}

export const getSchedules = async () => {
  const response = await $api.get(`schedules/`);
  return response.data;
};

export const addSchedule = async (data: any) => {
  const response = await $api.post(`schedules/`, data);
  return response.data;
};

export const patchSchedule = async (id: string | number, data: any) => {
  const response = await $api.patch(`schedules/${id}/`, data);
  return response.data;
};

export const deleteSchedule = async (id: string | number) => {
  const response = await $api.delete(`schedules/${id}/`);
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

export const getCourses = async (id: number | null) => {
  const response = await $api.get("schedules/courses/", {
    params: {
      educationLevel: id,
    },
  });
  return response.data;
};

export const getEducationLevels = async () => {
  const response = await $api.get("schedules/education-levels/");
  return response.data;
};
