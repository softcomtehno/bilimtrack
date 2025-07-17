import { useQuery } from '@tanstack/react-query'
import { getMentorGroups } from './group.api'

const keys = {
  root: () => ['mentorGroups'],
  bySubject: (subjectId: number) => ['mentorGroups', subjectId],
}

export function useGetMentorGroups(
  subjectId?: number,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: keys.bySubject(subjectId ?? 0),
    queryFn: () => getMentorGroups(subjectId!),
    enabled: !!subjectId && options?.enabled !== false,
  })
}
