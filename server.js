const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Root response is working");
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

/*
API Endpoints
/root --> res = Root response is working
/signIn --> POST = success/fail
/register --> POST = user object
/profile/:userId --> GET = user
/image --> PUT --> update user object to reflect changes in score
*/
