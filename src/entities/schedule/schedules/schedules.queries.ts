import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getLessonTimes,
  getLessonTypes,
  getSchedules,
  getSubjects,
  addSchedule,
  patchSchedule,
  deleteSchedule,
  getCourses,
  getEducationLevels,
  getMentorSchedule,
} from './schedules.api';

const keys = {
  root: () => ['schedules'],
  getSubjects: () => [...keys.root(), 'subjects'],
  getLessonTypes: () => [...keys.root(), 'lessonTypes'],
  getLessonTimes: () => [...keys.root(), 'lessonTimes'],
  getCourses: () => [...keys.root(), 'courses'],
  getEduLevels: () => [...keys.root(), 'eduLevels'],
};

export function useGetSchedules() {
  return useQuery({
    queryKey: keys.root(),
    queryFn: getSchedules,
  });
}

export function useGetMentorSchedule() {
  return useQuery({
    queryKey: [...keys.root(), 'mentor'],
    queryFn: getMentorSchedule,
  });
}

export function useGetEducationLevels() {
  return useQuery({
    queryKey: keys.getEduLevels(),
    queryFn: getEducationLevels,
  });
}

export function useGetSubjects() {
  return useQuery({
    queryKey: keys.getSubjects(),
    queryFn: getSubjects,
  });
}

export function useGetLessonTypes() {
  return useQuery({
    queryKey: keys.getLessonTypes(),
    queryFn: getLessonTypes,
  });
}

export function useGetLessonTimes() {
  return useQuery({
    queryKey: keys.getLessonTimes(),
    queryFn: getLessonTimes,
  });
}

export function useGetCourses(id: number | null) {
  return useQuery({
    queryKey: [...keys.getCourses(), id], // 👈 теперь ключ зависит от id
    queryFn: () => getCourses(id),
    // enabled: id !== null, // 👈 запрос будет только если выбран id
  });
}

export function useAddScheduleMutation() {
  return useMutation({
    mutationFn: (data: any) => addSchedule(data),
  });
}

export function usePatchScheduleMutation() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) =>
      patchSchedule(id, data),
  });
}

export function useDeleteScheduleMutation() {
  return useMutation({
    mutationFn: (id: string | number) => deleteSchedule(id),
  });
}
