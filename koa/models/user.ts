import * as db from "../utils/db-util";
const getUser = async (id: string) => {
  let _sql = `SELECT id,name,password 
              FROM users 
              WHERE id=?`;

  return db.query(_sql, [id]);
};

export { getUser };
