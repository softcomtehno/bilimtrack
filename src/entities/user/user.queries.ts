import {
  useMutation,
  useQuery,
  queryOptions as tsqQueryOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { setCookie, removeCookie } from 'typescript-cookie';
import { toast } from 'react-toastify';

import {
  editMentorProfile,
  editUserProfile,
  emailActivationMutation,
  getPerfomanceChart,
  getSkills,
  getTokenMutation,
  loginUserQuery,
  registerUserMutation,
} from './user.api';
import {
  useMutation,
  useQuery,
  queryOptions as tsqQueryOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { setCookie } from 'typescript-cookie';
import { toast } from 'react-toastify';
import { UserDtoSchema } from './user.types';
import { queryClient } from '@/shared/lib/react-query/react-query.lib';
import { pathKeys } from '@/shared/lib/react-router';

const ACCESS_TOKEN_KEY = 'access';
const REFRESH_TOKEN_KEY = 'refresh';

const keys = {
  root: () => ['user'],
  getToken: () => [...keys.root(), 'getToken'] as const,
  loginUser: () => [...keys.root(), 'loginUser'] as const,
  chart: () => [...keys.root(), 'chart'] as const,
  skills: () => [...keys.root(), 'skills'] as const,
  registerUser: () => [...keys.root(), 'registerUser'] as const,
  user: (username: string) => [...keys.root(), 'username', username] as const,
};

export const userService = {
  queryKey: () => keys.root(),

  removeCache: () => queryClient.removeQueries({ queryKey: keys.root() }),

  getCache: () => queryClient.getQueryData<Comment[]>(userService.queryKey()),

  setCache: (user: UserDtoSchema) =>
    queryClient.setQueryData(userService.queryKey(), user),

  queryOptions: () => {
    const userKey = userService.queryKey();

    return tsqQueryOptions({
      queryKey: userKey,
      queryFn: async () => loginUserQuery,
      initialDataUpdatedAt: () =>
        queryClient.getQueryState(userKey)?.dataUpdatedAt,
    });
  },

  prefetchQuery: async () =>
    queryClient.prefetchQuery(userService.queryOptions()),

  ensureQueryData: async () =>
    queryClient.ensureQueryData(userService.queryOptions()),
};

type AxiosErrorType = {
  code: string;
  config: any;
  message: string;
  name: string;
  request: any;
  response?: {
    data: any;
    status: number;
    headers: any;
    config: any;
  };
};

export function useLoginUserQuery() {
  return useQuery({
    queryKey: keys.loginUser(),
    queryFn: loginUserQuery,
  });
}

export function useGetTokenMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: keys.getToken(),
    mutationFn: getTokenMutation,
    onSuccess: (response: any) => {
      const { access, refresh } = response.data;
      setCookie(ACCESS_TOKEN_KEY, access, {
        path: '/', // ключевой момент!
        sameSite: 'Strict',
        secure: true,
      });
      localStorage.setItem(REFRESH_TOKEN_KEY, refresh);

      toast.success('Вы успешно авторизовались!', { autoClose: 500 });
      navigate('/');
    },
    onError: (error: AxiosErrorType) => {
      const errorMessage = error.response?.data?.detail || 'Ошибка авторизации';
      toast.error(errorMessage);
    },
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationKey: keys.registerUser(),
    mutationFn: registerUserMutation,
    onSuccess: async () => {
      await toast.success(
        'На вашу почту отправлено письмо для подтверждения вашей почты.'
      );
    },
    onError: (error: AxiosErrorType) => {
      if (error.response && error.response.data) {
        const errors = error.response.data;

        Object.keys(errors).forEach((field) => {
          toast.error(`${field}: ${errors[field][0]}`);
        });
      } else {
        toast.error('Ошибка при выполнении запроса');
      }
    },
  });
}

export function useEditUserProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: keys.root(),
    mutationFn: editUserProfile,
    onSuccess: async () => {
      await toast.success('Ваш профиль успешно изменен!');
      await queryClient.invalidateQueries({ queryKey: keys.root() });
    },
    onError: (error: AxiosErrorType) => {
      if (error.response && error.response.data) {
        const errors = error.response.data;

        Object.keys(errors).forEach((field) => {
          toast.error(`${field}: ${errors[field][0]}`);
        });
      } else {
        toast.error('Ошибка при выполнении запроса');
      }
    },
  });
}

export function useEditMentorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editMentorProfile,
    onSuccess: () => {
      toast.success('Профиль ментора успешно обновлён!');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: () => {
      toast.error('Ошибка при обновлении профиля');
    },
  });
}

export function useActivationMutation() {
  return useMutation({
    mutationKey: keys.registerUser(),
    mutationFn: emailActivationMutation,
    onSuccess: async () => {
      await toast.success('Success');
    },
    onError: (error: AxiosErrorType) => {
      if (error.response && error.response.data) {
        const errors = error.response.data;

        Object.keys(errors).forEach((field) => {
          toast.error(`${field}: ${errors[field][0]}`);
        });
      } else {
        toast.error('Ошибка при выполнении запроса');
      }
    },
  });
}

export function useGetUserPerfomanceChart() {
  return useQuery({
    queryKey: keys.chart(),
    queryFn: () => getPerfomanceChart(),
  });
}

export function useGetSkills() {
  return useQuery({
    queryKey: keys.skills(),
    queryFn: () => getSkills(),
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return () => {
    console.log('Logout clicked'); // <- проверка
    try {
      // Удаляем токены
      removeCookie(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.clear();
      // Чистим кэш пользователя
      queryClient.removeQueries({ queryKey: ['user'] });

      toast.success('Вы вышли из аккаунта');

      // Редирект на главную
      navigate(pathKeys.home());
    } catch (err) {
      console.error('Ошибка при выходе:', err);
      toast.error('Не удалось выйти из аккаунта');
    }
  };
}
