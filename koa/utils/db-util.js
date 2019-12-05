import mysql from "mysql2";

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "taleyoung",
  database: "sims"
});

let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        resolve(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};

let createTable = function(sql) {
  return query(sql, []);
};

let findDataById = function(table, id) {
  let _sql = "SELECT * FROM ?? WHERE id = ? ";
  return query(_sql, [table, id, start, end]);
};

let findDataByPage = function(table, keys, start, end) {
  let _sql = "SELECT ?? FROM ??  LIMIT ? , ?";
  return query(_sql, [keys, table, start, end]);
};

let insertData = function(table, values) {
  let _sql = "INSERT INTO ?? SET ?";
  return query(_sql, [table, values]);
};

let updateData = function(table, values, id) {
  let _sql = "UPDATE ?? SET ? WHERE id = ?";
  return query(_sql, [table, values, id]);
};

let deleteDataById = function(table, id) {
  let _sql = "DELETE FROM ?? WHERE id = ?";
  return query(_sql, [table, id]);
};

let select = function(table, keys) {
  let _sql = "SELECT ?? FROM ?? ";
  return query(_sql, [keys, table]);
};

let count = function(table) {
  let _sql = "SELECT COUNT(*) AS total_count FROM ?? ";
  return query(_sql, [table]);
};

export {
  query,
  createTable,
  findDataById,
  findDataByPage,
  deleteDataById,
  insertData,
  updateData,
  select,
  count
};
