import { useQuery } from '@tanstack/react-query'
import { getRatingByUsers } from './rating.api'

const keys = {
  root: () => ['rating'],
  byUsers: () => [...keys.root(), 'byUsers'],
  byGroups: (id: number) => [...keys.root(), "byGroups", id],
}

export function useGetRatingByUsers({ subjectId, groupId }) {
  return useQuery({
    queryKey: ['rating', 'byUsers', { subjectId, groupId }], // 🔑 ключ зависит от фильтра
    queryFn: () => getRatingByUsers({ subjectId, groupId }),
    enabled: !!subjectId && !!groupId,
  });
}