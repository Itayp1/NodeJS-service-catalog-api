const express = require("express");
const app = express();
const ACCESS_TOKEN = {
  issued_to:
    "879750377002-sj5g0pq3k0kvu4n9ebljh8qchcq2l50s.apps.googleusercontent.com",
  audience:
    "879750377002-sj5g0pq3k0kvu4n9ebljh8qchcq2l50s.apps.googleusercontent.com",
  user_id: "111419783870020296528",
  scope:
    "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid",
  expires_in: 2915,
  email: "peretz.itay@gmail.com",
  verified_email: true,
  access_type: "offline"
};

app.get("/oauth2/v1/tokeninfo", (req, res) => {
  const { access_token } = req.query;
  if (!access_token) res.status(400).send({ status: "missing acces_token" });

  console.log(access_token);
  res.send(ACCESS_TOKEN);
});

app.listen(3001, () => {
  console.log("listen on port 3001");
});
