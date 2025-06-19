import { useQuery } from "@tanstack/react-query";
import { getSchedules } from "./schedules.api";

const keys = {
  root: () => ["schedules"],
  // getDocuments: () => [...keys.root(), 'documents'],
};

export function useGetSchedules() {
  return useQuery({
    queryKey: keys.root(),
    queryFn: getSchedules,
  });
}

// export function useGetPartnersDocuments() {
//   return useQuery({
//     queryKey: keys.getDocuments(),
//     queryFn: getPartnersDocuments,
//   })
// }
