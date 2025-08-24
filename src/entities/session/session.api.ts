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
