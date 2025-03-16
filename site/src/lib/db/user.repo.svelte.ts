import Request from '$libs/types/request.svelte';
import { FailedRequest, SuccessRequest } from '../types/request.svelte';

function getUser({ email, password }: { email: string, password: string }): Request<User> {
  let userState = new Request<User>();

  mysqlconnFn().query(`
    SELECT
      Id,
      Email,
      Name
    FROM Users
    WHERE
      Email = '${email}'
      AND Password = '${password}'
  `).then(([firstUser]) => {
    if (isUser(firstUser)) {
      userState = new SuccessRequest({
        id: firstUser.Id,
        email: firstUser.Email,
        name: firstUser.Name
      })
    }
    else {
      userState = new FailedRequest('No user found')
    } 

  });

  return userState;
}

export type User = {
  id: string;
  email: string;
  name: string;
}

export function isUser(user: any): user is User {
  return typeof user?.id === 'string'
    && typeof user?.email === 'string'
    && typeof user?.name === 'string'
}