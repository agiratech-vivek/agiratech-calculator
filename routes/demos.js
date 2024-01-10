const mysql = require("mysql2/promise");
const express = require("express");

const db = require("../utils/dbqueries");

const router = express.Router();

router.get("/", function (request, response) {
  response.render("index", {expressionList : []});
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
  const user = request.body.username;

  let [expressionId] = await db.getExpressionId(expression);
  if (!expressionId.length) {
    [expressionId] = await db.insertQueries(expression, result);
  }
  const [userId] = await db.getUser(user);
  await db.insertIntoMappingTable(userId[0].id, expressionId[0].id);
  response.json({});
});

router.get("/search/:user", async function (request, response) {
  const user = request.params.user;
  const [expressionList] = await db.fetchUserHistory(user);
  console.log(expressionList);
  return response.json({expressionList});
});

module.exports = router;