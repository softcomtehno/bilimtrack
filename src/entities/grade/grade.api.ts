import $api from '@/shared/api'

// GET — получение оценок по группе и предмету
export function getGrades(groupId: number, subjectId: number) {
  return $api.get(`mentor-grades/`, {
    params: {
      groupId,
      subjectId,
    },
  })
}

// POST — создание новой оценки
export function createGrade(data: {
  session: string
  grade: number
  user: number
}) {
  return $api.post(`mentor-grades/`, data)
}

// PUT — полное обновление оценки по id
export function updateGradeFull(
  id: number,
  data: {
    grade: number
  }
) {
  return $api.put(`mentor-grades/${id}/`, data)
}

// PATCH — частичное обновление оценки по id
export function updateGradePartial(
  id: number,
  data: {
    grade: number
  }
) {
  return $api.patch(`mentor-grades/${id}/`, data)
}
