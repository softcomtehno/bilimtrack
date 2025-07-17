import $api from '@/shared/api'

export function getSubjects() {
  return $api.get(`subjects`)
}
