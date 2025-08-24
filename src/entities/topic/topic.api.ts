import $api from '@/shared/api'

// список тем по subject
export const getTopics = (subject: number | string) =>
  $api.get(`mentor/lesson-topics/`, {
    params: { subject },
  })

// создать новую тему
export const addTopic = (subject: number | string, title: string) =>
  $api.post(`mentor/lesson-topics/`, {
    subject,
    title,
  })

// получить тему по id
export const getTopic = (id: number | string) =>
  $api.get(`mentor/lesson-topics/${id}/`)

// обновить тему полностью
export const updateTopic = (
  id: number | string,
  subject: number | string,
  title: string
) =>
  $api.put(`mentor/lesson-topics/${id}/`, {
    subject,
    title,
  })

// частичное обновление (например, только title)
export const patchTopic = (
  id: number | string,
  data: { subject?: number | string; title?: string }
) => $api.patch(`mentor/lesson-topics/${id}/`, data)

// удалить тему
export const deleteTopic = (id: number | string) =>
  $api.delete(`mentor/lesson-topics/${id}/`)
