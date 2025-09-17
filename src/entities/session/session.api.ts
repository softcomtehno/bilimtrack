import $api from '@/shared/api'

// Привязать тему к занятию
export const updateSessionTopic = (
  sessionId: number | string,
  topicId: number | string
) => {
  return $api.patch(`mentor/sessions/${sessionId}/`, {
    topic: topicId,
  })
}

export const createSession = (data: {
  subject: number
  groups: number[]
  date: string
  startTime: string
  endTime: string
}) => {
  return $api.post('/mentor/sessions/', data)
}
export const deleteSession = (id: string) => {
  return $api.delete(`/mentor/sessions/${id}`)
}
