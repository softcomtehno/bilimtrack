import { useQuery } from "@tanstack/react-query";
import { getSchedulesGroups } from "./groups.api";

const keys = {
  root: () => ["schedules-groups"],
  // getDocuments: () => [...keys.root(), 'documents'],
};

export function useGetSchedulesGroups(id: number | null) {
  return useQuery({
    queryKey: [keys.root(), id],
    queryFn: () => getSchedulesGroups(id),
  });
}

// export function useGetPartnersDocuments() {
//   return useQuery({
//     queryKey: keys.getDocuments(),
//     queryFn: getPartnersDocuments,
//   })
// }
