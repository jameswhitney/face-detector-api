const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("Incorrect form submission");
  }
  const emailExists = db
    .select("email")
    .from("users")
    .where("email", "=", email);
  if (emailExists) {
    return res.status(400).json("Unable to register. Duplicate entry");
  } else {
    const hash = bcrypt.hashSync(password);
    db.transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into("login")
        .returning("email")
        .then((loginEmail) => {
          return trx("users")
            .returning("*")
            .insert({
              name: name,
              email: loginEmail[0],
              joined: new Date(),
            })
            .then((user) => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch(() =>
      res.status(400).json("Error ocurred during registration process")
    );
  }
};

module.exports = {
  handleRegister,
};
