import $api from '@/shared/api';

export function getRatingByUsers({ subjectId, groupId }) {
  return $api.get(`rating/users/`, {
    params: { subjectId, groupId },
  });
}
export function getRatingByGroups() {
  return $api.get(`rating/groups/`);
}

export function getUserRatingByCourse(){}
export function getGroupRatingByCourse(){}
export function getRatingInGroup(){}