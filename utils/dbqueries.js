const db = require("../data/database");
const bcrypt = require("bcrypt");

async function addNewUser(id, username, name, password){
  const addUser = "INSERT INTO users (id, user,name, password) values (?)"
  const hash = bcrypt.hashSync(password, 12);
  console.log(hash.length);
  await db.query(addUser, [[id, username,name, hash]]);
}

async function getUser(username){
    const searchUser = "SELECT id, name, password FROM users WHERE user = ?";
    return await db.query(searchUser, [[username]]);
}

async function fetchUserHistory(startDate, endDate, userId){
  const searchHistory = 
  `SELECT q.expression, q.result
  FROM users u
  JOIN users_queries uq
  ON u.id = uq.user_id
  JOIN queries q
  ON q.id = uq.query_id
  WHERE u.id = ? AND uq.date BETWEEN ? AND ?`
  return await db.query(searchHistory, [userId, startDate, endDate]);
};

async function getExpressionId(expression){
    const searchQueryString = "SELECT id from queries WHERE expression = ?";
    return await db.query(searchQueryString, [expression]);
}

async function insertQueries(id, expression, result){
    const insertQueryString =
    "INSERT INTO queries (id, expression, result) values (?)";
    console.log(id);
    await db.query(insertQueryString,[[id, expression, result]]);
}

async function insertIntoMappingTable(userId, expressionId, date){
    const insertInMappingTableQueryString = 
    "INSERT INTO users_queries (user_id, query_id, date) values (?)";
    await db.query(insertInMappingTableQueryString, [[userId, expressionId, date]]);
}

module.exports = {
    addNewUser : addNewUser,
    getUser : getUser,
    fetchUserHistory : fetchUserHistory,
    getExpressionId : getExpressionId,
    insertQueries : insertQueries,
    insertIntoMappingTable : insertIntoMappingTable
}