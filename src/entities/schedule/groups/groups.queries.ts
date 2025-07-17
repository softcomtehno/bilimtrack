import { useQuery } from "@tanstack/react-query";
import { getSchedulesGroups } from "./groups.api";

const keys = {
  root: () => ["schedules-groups"],
  // getDocuments: () => [...keys.root(), 'documents'],
};

export function useGetSchedulesGroups() {
  return useQuery({
    queryKey: keys.root(),
    queryFn: getSchedulesGroups,
  });
}

// export function useGetPartnersDocuments() {
//   return useQuery({
//     queryKey: keys.getDocuments(),
//     queryFn: getPartnersDocuments,
//   })
// }
