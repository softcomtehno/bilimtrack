import $api from '~shared/api';
import {
  ActivationData,
  CreateUserSchema,
  EditUserProfile,
  LoginUserDto,
  TokensDtoSchema,
  UserDtoSchema,
} from './user.types';

export function getTokenMutation(params: { user: LoginUserDto }) {
  return $api.post<TokensDtoSchema>('jwt/create/', params.user);
}

export function loginUserQuery() {
  return $api.get<UserDtoSchema>('users/me');
}

export function registerUserMutation(params: { user: CreateUserSchema }) {
  return $api.post('users/', params.user);
}

export function emailActivationMutation(params: { data: ActivationData }) {
  return $api.post('users/activation/', params.data);
}

export function editUserProfile(params: { user: EditUserProfile }) {
  return $api.patch('users/me/', params.user);
}

export function getPerfomanceChart() {
  return $api.get('perfomance-chart/me');
}

export function getSkills(){
  return $api.get('skills/');
}

type MentorProfileForm = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  photo?: File | null;
  skills: number[];
  mentorAchievements: string;
  instagram: string;
  telegram: string;
  whatsapp: string;
  facebook: string;
  educations: {
    institution: string;
    fieldOfStudy: string;
    date: string;
    description: string;
  }[];
  workExperiences: {
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
};

export async function editMentorProfile(data: MentorProfileForm) {
  const { photo, ...rest } = data;

  if (photo) {
    const formData = new FormData();

    formData.append('username', rest.username);
    formData.append('first_name', rest.firstName);
    formData.append('last_name', rest.lastName);
    formData.append('email', rest.email);
    formData.append('phone_number', rest.phoneNumber);
    formData.append('mentor_achievements', rest.mentorAchievements);
    formData.append('instagram', rest.instagram);
    formData.append('telegram', rest.telegram);
    formData.append('whatsapp', rest.whatsapp);
    formData.append('facebook', rest.facebook);

    rest.skills.forEach((skillId) => {
      formData.append('skills', skillId.toString());
    });

    rest.educations.forEach((edu, index) => {
      formData.append(`educations[${index}][institution]`, edu.institution);
      formData.append(`educations[${index}][field_of_study]`, edu.fieldOfStudy);
      formData.append(`educations[${index}][date]`, edu.date);
      formData.append(`educations[${index}][description]`, edu.description);
    });

    rest.workExperiences.forEach((work, index) => {
      formData.append(`work_experiences[${index}][position]`, work.position);
      formData.append(`work_experiences[${index}][company]`, work.company);
      formData.append(`work_experiences[${index}][start_date]`, work.startDate);
      formData.append(`work_experiences[${index}][end_date]`, work.endDate);
      formData.append(
        `work_experiences[${index}][description]`,
        work.description
      );
    });

formData.append('photo', photo);

    return $api.patch('users/me/', formData, {
      headers: {
        // Content-Type НЕ указываем, axios сам установит multipart/form-data
      },
    });
  } else {
    // Если нет фото, отправляем JSON
    return $api.patch('users/me/', {
      username: rest.username,
      first_name: rest.firstName,
      last_name: rest.lastName,
      email: rest.email,
      phone_number: rest.phoneNumber,
      skills: rest.skills,
      mentor_achievements: rest.mentorAchievements,
      instagram: rest.instagram,
      telegram: rest.telegram,
      whatsapp: rest.whatsapp,
      facebook: rest.facebook,
      educations: rest.educations,
      work_experiences: rest.workExperiences,
    });
  }
}
