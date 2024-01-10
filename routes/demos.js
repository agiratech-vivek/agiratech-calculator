const mysql = require("mysql2/promise");
const express = require("express");

const db = require("../utils/dbqueries");

const router = express.Router();

router.get("/", function (request, response) {
  response.render("signup");
});

router.post("/submit", async function (request, response) {
  const user = request.body.username;
  const [id] = await db.getUser(user);

  if (id.length === 0) {
    await db.insertUser(user);
  } else {
    const [expressionList] = await db.fetchUserHistory(user);
    response.json({expressionList : expressionList});
    return;
  }
  response.json({});
});

router.post("/saveresult", async function (request, response) {
  const expression = request.body.expression;
  const result = request.body.result;
  const username = request.body.username;

  let [expressionId] = await db.getExpressionId(expression);
  if (!expressionId.length) {
    [expressionId] = await db.insertQueries(expression, result);
  }
  
  const [userId] = await db.getUser(username);
  // checking if user_id and expression_id already exists in mapping table
  const [user_id] = await db.searchUserIdQueryIdInMappingTable(userId[0].id, expressionId[0].id);
  if(!user_id.length)await db.insertIntoMappingTable(userId[0].id, expressionId[0].id);
  response.json({});
});

router.get("/search/:user", async function (request, response) {
  const user = request.params.user;
  const [expressionList] = await db.fetchUserHistory(user);
  return response.json({expressionList});
});

module.exports = router;