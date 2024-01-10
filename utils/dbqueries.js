const db = require("../data/database");

async function getUser(user){
    const searchUser = "SELECT id FROM users WHERE name = ?";
    return await db.query(searchUser, [[user]]);
}

const insertUser = async (user) => {
  const insertUserQuery = "INSERT INTO users (name) values (?)";
  await db.query(insertUserQuery, [user]);
};

async function fetchUserHistory(user){
  const fetchUserHistoryQuery = `SELECT q.expression as expression, q.result as result 
    FROM users u 
    JOIN users_queries uq 
    ON u.id = uq.user_id 
    JOIN queries q 
    ON uq.query_id = q.id 
    WHERE u.name = ?`;
  return await db.query(fetchUserHistoryQuery, [user]);
};

async function getExpressionId(expression){
    const searchQueryString = "SELECT id from queries WHERE expression = ?";
    return await db.query(searchQueryString, [expression]);
}

async function insertQueries(expression, result){
    const insertQueryString =
    "INSERT INTO queries (expression, result) values (?)";
    await db.query(insertQueryString,[[expression, result]]);
    return await getExpressionId(expression);
}

async function searchUserIdQueryIdInMappingTable(userId, expressionId){
  const searchInMappingTable = "SELECT user_id FROM users_queries WHERE user_id = ? AND query_id = ?";
  return await db.query(searchInMappingTable, [userId, expressionId]);
}

async function insertIntoMappingTable(userId, expressionId){
    const insertInMappingTableQueryString = 
    "INSERT INTO users_queries values (?)";
    await db.query(insertInMappingTableQueryString, [[userId+"", expressionId+""]]);
}

module.exports = {
    getUser : getUser,
    insertUser : insertUser,
    fetchUserHistory : fetchUserHistory,
    getExpressionId : getExpressionId,
    insertQueries : insertQueries,
    searchUserIdQueryIdInMappingTable : searchUserIdQueryIdInMappingTable,
    insertIntoMappingTable : insertIntoMappingTable
}