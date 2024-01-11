const express = require("express");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const db = require("../utils/dbqueries");

const router = express.Router();

router.get("/", function (request, response) {
  response.render("signup");
});

router.get("/signin", (request, response) => {
  response.render("index", {expressionList : []});
})

router.post("/signup", async (request, response) => {
  const id = uuid.v4();
  const username = request.body.username;
  const name = request.body.name;
  const password = request.body.password;
  await db.addNewUser(id, username,name, password);
  return response.render("index", {expressionList : []});
});

router.get("/checkuser/:username", async (request, response) => {
  const username = request.params.username;
  const {id} = await db.getUser(username);
  response.json({id : id});
});

router.post("/submit", async function (request, response) {
  const user = request.body.username;
  const plainTextPassword = request.body.password;

  const getUserPassword = await db.getUser(user);

  if (!getUserPassword[0][0]) {
    return response.json({message : "No user found"});
  }

  const {id, name, password} = getUserPassword[0][0];

  const comparePassword = bcrypt.compareSync(plainTextPassword, password);
  if(comparePassword){
    response.json({message : name});
    return;
  }
  response.json({message : "Username or Password incorrect"});
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