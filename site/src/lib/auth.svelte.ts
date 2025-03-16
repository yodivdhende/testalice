import { mysqlconnFn } from './db/mysql';

let activeUser: ActiveUser | null = $state(null);


export type ActiveUser  = {
  email: string;
  name: string;
}

async function login(email:string, password: string){
  const mysqlconn = await mysqlconnFn();
  let results = await mysqlconn.query('SELECT * FROM Users')
    .then(function ([rows]) {
      return rows;
    });

  return {
    body: results
  }
}

export {
  activeUser,
}
