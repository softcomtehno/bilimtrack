import { useQuery } from "@tanstack/react-query";
import { getSchedulesRooms } from "./rooms.api";

const keys = {
  root: () => ["schedules-rooms"],
  // getDocuments: () => [...keys.root(), 'documents'],
};

export function useGetSchedulesRooms() {
  return useQuery({
    queryKey: keys.root(),
    queryFn: getSchedulesRooms,
  });
}

// export function useGetPartnersDocuments() {
//   return useQuery({
//     queryKey: keys.getDocuments(),
//     queryFn: getPartnersDocuments,
//   })
// }
