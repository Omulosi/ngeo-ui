import { roles } from 'src/config';

export function isFieldOfficer(role) {
  return role === roles.FOO;
}

export function isCountyManager(role) {
  return role === roles.CM;
}

export function isRegionalManager(role) {
  return role === roles.RM;
}

export function isFinance(role) {
  return role === roles.Finance;
}

export function isHR(role) {
  return role === roles.HR;
}

export function isCEO(role) {
  return role === roles.CEO;
}
