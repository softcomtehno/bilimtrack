import $api from '@/shared/api'

export function getSubjects() {
  return $api.get(`subjects`)
}
export function getSubjectsMentor() {
  return $api.get(`mentor/subjects/me/`)
}
