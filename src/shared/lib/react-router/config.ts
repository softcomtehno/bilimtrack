export const pathKeys = {
  root: '/',
  home() {
    return pathKeys.root
  },
  schedule() {
    return pathKeys.root.concat('schedule/')
  },
  mentor() {
    return pathKeys.root.concat('mentor/')
  },
  timetable() {
    return pathKeys.root.concat('timetable/')
  },
  student() {
    return pathKeys.root.concat('student/')
  },
  about() {
    return pathKeys.root.concat('about/')
  },
  scanner() {
    return pathKeys.root.concat('scanner/')
  },
  terms() {
    return pathKeys.root.concat('terms-of-use/')
  },
  policy() {
    return pathKeys.root.concat('privacy-policy/')
  },
  tv() {
    return pathKeys.root.concat('tv/')
  },
  login() {
    return pathKeys.root.concat('auth/')
  },
  program() {
    return pathKeys.root.concat('course/')
  },
  ranking() {
    return pathKeys.root.concat('ranking/')
  },

  tanda() {
    return pathKeys.root.concat('tanda/')
  },
  tandaTest() {
    return pathKeys.root.concat('tanda/test/')
  },
  tandaLogin() {
    return pathKeys.root.concat('tanda/login/')
  },
  tandaResult() {
    return pathKeys.root.concat('tanda/result/')
  },
  // group({ params }: { params: { slug: string } }) {
  //   return pathKeys.root.concat(`group/${params.slug}/`);
  // },
  course: {
    root() {
      return pathKeys.root.concat('courses/')
    },
    bySlug(slug: string) {
      return pathKeys.course.root().concat(`${slug}/`)
    },
  },
  profile: {
    root() {
      return pathKeys.root.concat('profile/')
    },
    badges() {
      return pathKeys.profile.root().concat('badges/')
    },
  },
  subject: {
    root() {
      return pathKeys.root.concat('subjects/')
    },
    byId(id: number | string) {
      return pathKeys.subject.root().concat(`${id}/`)
    },
    groupById(subjectId: number | string, groupId: number | string) {
      return pathKeys.subject.byId(subjectId).concat(`groups/${groupId}/`)
    },
  },

  lessonId: {
    byId(id: string) {
      return `attend/${id}/`
    },
  },
  studentGrade: {
    byId(id: string) {
      return `student-grade/${id}`
    },
  },
}
