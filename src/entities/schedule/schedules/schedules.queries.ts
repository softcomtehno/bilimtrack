import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getLessonTimes,
  getLessonTypes,
  getSchedules,
  getSubjects,
  patchSchedule,
} from "./schedules.api";

const keys = {
  root: () => ["schedules"],
  getSubjects: () => [...keys.root(), "subjects"],
  getLessonTypes: () => [...keys.root(), "lessonTypes"],
  getLessonTimes: () => [...keys.root(), "lessonTimes"],
};

export function useGetSchedules() {
  return useQuery({
    queryKey: keys.root(),
    queryFn: getSchedules,
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

export function usePatchScheduleMutation() {
  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) =>
      patchSchedule(id, data),
  });
}
