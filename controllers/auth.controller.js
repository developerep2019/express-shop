module.exports.getLogin = (req, res, next) => {
  const isLoggedIn =
    req.get("Cookie").split(";")[2].trim().split("=")[1] === "true";
  res.render("auth/login", {
    path: "/login",
    docTitle: "Login",
    isLoggedIn: isLoggedIn,
  });
};

module.exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};
