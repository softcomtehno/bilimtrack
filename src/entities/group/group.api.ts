import $api from '@/shared/api'

export function getMentorGroups(subjectId: number) {
  return $api.get(`groups/mentor/me`, {
    params: {
      subjectId,
    },
  })
}
