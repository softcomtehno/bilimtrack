import { useQuery } from '@tanstack/react-query'
import { getRatingByGroups, getRatingByUsers } from './rating.api'

const keys = {
  root: () => ['rating'],
  byUsers: () => [...keys.root(), 'byUsers'],
  byGroups: () => ["byGroups"],
}

export function useGetRatingByUsers({ subjectId, groupId }) {
  return useQuery({
    queryKey: ['rating', 'byUsers', { subjectId, groupId }], // 🔑 ключ зависит от фильтра
    queryFn: () => getRatingByUsers({ subjectId, groupId }),
  
  });
}

export function useGetRatingByGroups(){
  return useQuery({
    queryKey:keys.byGroups(),
    queryFn: () => getRatingByGroups(),
  })
}