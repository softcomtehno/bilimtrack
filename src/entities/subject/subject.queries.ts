import { useQuery } from '@tanstack/react-query'
import { getSubjects } from './subject.api'

const keys = {
  root: () => ['subjects'],
  // getDocuments: () => [...keys.root(), 'documents'],
}

export function useGetSubjects() {
  return useQuery({
    queryKey: keys.root(),
    queryFn: getSubjects,
  })
}
