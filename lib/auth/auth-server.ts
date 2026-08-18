import { headers } from 'next/headers';
import { auth } from './auth';

export const getSession = async () => {
  const result = await auth.api.getSession({
    headers: await headers(),
  });
  return result;
};
