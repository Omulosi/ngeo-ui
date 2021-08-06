import useUser from 'src/hooks/user';
import { roles } from 'src/config';

export default function useHR() {
  const { data: userData, isSuccess: userSuccess } = useUser();
  let user = null;
  let isHR = false;
  if (userSuccess) {
    user = userData.attributes;
    isHR = user && user.role && user.role === roles.HR;
  }

  return isHR;
}

export function useFinance() {
  const { data: userData, isSuccess: userSuccess } = useUser();
  let user = null;
  let isFinance = false;
  if (userSuccess) {
    user = userData.attributes;
    isFinance = user && user.role && user.role === roles.Finance;
  }

  return isFinance;
}

export function useCM() {
  const { data: userData, isSuccess: userSuccess } = useUser();
  let user = null;
  let isCM = false;
  if (userSuccess) {
    user = userData.attributes;
    isCM = user && user.role && user.role === roles.CM;
  }

  return isCM;
}

export function useFOO() {
  const { data: userData, isSuccess: userSuccess } = useUser();
  let user = null;
  let isFOO = false;
  if (userSuccess) {
    user = userData.attributes;
    isFOO = user && user.role && user.role === roles.FOO;
  }

  return isFOO;
}

export function useRM() {
  const { data: userData, isSuccess: userSuccess } = useUser();
  let user = null;
  let isRM = false;
  if (userSuccess) {
    user = userData.attributes;
    isRM = user && user.role && user.role === roles.RM;
  }

  return isRM;
}

export function useCEO() {
  const { data: userData, isSuccess: userSuccess } = useUser();
  let user = null;
  let isCEO = false;
  if (userSuccess) {
    user = userData.attributes;
    isCEO = user && user.role && user.role === roles.CEO;
  }

  return isCEO;
}
