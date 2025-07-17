import { useQuery } from "@tanstack/react-query";
import { getSchedulesTeachers } from "./teachers.api";

const keys = {
  root: () => ["schedules-teachers"],
  // getDocuments: () => [...keys.root(), 'documents'],
};

export function useGetSchedulesTeachers() {
  return useQuery({
    queryKey: keys.root(),
    queryFn: getSchedulesTeachers,
  });
}

// export function useGetPartnersDocuments() {
//   return useQuery({
//     queryKey: keys.getDocuments(),
//     queryFn: getPartnersDocuments,
//   })
// }
