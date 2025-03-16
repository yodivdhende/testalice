// @ts-nocheck
import { mysqlconnFn } from '../lib/db/mysql';
import type { PageLoad } from './$types';

export const load = async () => {
  let mysqlconn = await mysqlconnFn();

  let results = await mysqlconn.query('SELECT * FROM Users')
    .then(function ([rows]) {
      return rows;
    });

  return {
    body: results
  }
}


export async function get() {


};null as any as PageLoad;