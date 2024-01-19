const express = require("express");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const db = require("../utils/dbqueries");

const router = express.Router();

router.get("/", (request, response) => {
  response.render("signup");
});

router.get("/signin", (request, response) => {
  response.render("index", {expressionList : []});
})

router.post("/signup", async (request, response) => {
  const id = uuid.v4();
  const {username, name, password} = request.body;
  await db.addNewUser(id, username,name, password);
  return response.render("index", {expressionList : []});
});

router.get("/checkuser/:username", async (request, response) => {
  const username = request.params.username;
  const searchUserResponse = await db.getUser(username);
  if(!searchUserResponse[0][0]){
    return response.json({id : 0});
  }
  const {id} = searchUserResponse[0][0];
  return response.json({id});
});

router.post("/submit", async (request, response) => {
  const {user, plainTextPassword} = request.body;
  const getUserPassword = await db.getUser(user);
  
  if (!getUserPassword[0][0]) {
    return response.json({message : "No user found"});
  }

  const {id, name, password} = getUserPassword[0][0];
  
  const comparePassword = bcrypt.compareSync(plainTextPassword, password);
  if(comparePassword){
    response.json({message : name, id : id});
    return;
  }
  response.json({message : "Username or Password incorrect"});
});

router.post("/saveresult", async (request, response) => {
  const {expression, result, userId} = request.body;
  const expressionId = uuid.v4();

  const [expression_id] = await db.getExpressionId(expression);
  if (!expression_id.length) {
    await db.insertQueries(expressionId, expression, result);
  }
  
  await db.insertIntoMappingTable(userId, expressionId, (new Date).toISOString().substring(0, 10));
  response.json({});
});

console.log(new Date().toLocaleString().substring(0 , 9));

router.get("/history/:userid/:startdate/:enddate", async (request, response) => {
  const {userId, startDate, endDate} = request.params;
  console.log(userId + " " + startDate + " " + endDate);
  const [searchResult] = await db.fetchUserHistory(startDate, endDate, userId);
  response.json({searchResult : searchResult});
});

module.exports = router;