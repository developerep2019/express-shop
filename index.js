//dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Global Routes
const adminRoutes = require("./routes/admin.route");
const shopRoutes = require("./routes/shop.route");
const pageNotFoundController = require("./controllers/page-not-found.controller");
const authRoutes = require("./routes/auth.route");

//working with users
const UserModel = require("./models/user.model");

//setting the view engine and view directory
app.set("view engine", "ejs");
app.set("views", "./views");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
app.use((req, res, next) => {
  UserModel.findById("606c7967dc4f1511a80033cd")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

//routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(pageNotFoundController);

const port = process.env.PORT || 3000;

//mongoose
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(
    "mongodb+srv://node_complete_full:WDNiGegCADkLaKZv@node-complete-cluster.spnkn.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    UserModel.findOne().then((user) => {
      if (!user) {
        const user = new UserModel({
          name: "Ethun",
          email: "developerep2019@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(port, () => console.log(`listening from port ${port}`));
  })
  .catch((err) => console.log(err));
