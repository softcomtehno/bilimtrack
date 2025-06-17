import axios from 'axios'

const API_URL = 'https://api.bilim-track.makalabox.com/api/'

export function getGrades(groupId: number, subjectId: number) {
  return axios.get(`${API_URL}mentor-grades/`, {
    params: {
      groupId,
      subjectId,
    },
  })
}
