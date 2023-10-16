require("dotenv").config();
const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const bcrypt = require("bcryptjs");
const auth = require("./middleware/auth");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 1234;
// console.log(process.env.SECRET_KEY);
require("./db/conn");
const Register = require("./models/registers");

// Public static path
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../template/views");
const partials_path = path.join(__dirname, "../template/partials");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", template_path);
app.use(express.static(static_path));
hbs.registerPartials(partials_path);

// Routing
app.get("/", (req, res) => {
  res.render("index");
});
// app.get("/profile", auth, async (req, res) => {
//   // console.log(`This is the secret key ${req.cookies.jwt}`);
//   res.render("profile");
// });
app.get("/profile", auth, async (req, res) => {
  if (req.isAuthenticated) {
    res.render("profile");
  } else {
    res.render("login"); // Redirect to the login page if not authenticated
  }
});
app.get("/logout", auth, async (req, res) => {
  try {
    console.log(req.user);
    req.user.tokens = req.user.tokens.filter((currElement) => {
      return currElement.token !== req.token;
    });
    res.clearCookie("jwt");
    console.log("Logout successfully !");

    await req.user.save();
    res.render("login");
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/logoutall", auth, async (req, res) => {
  try {
    console.log(req.user);

    req.user.tokens = [];

    res.clearCookie("jwt");
    console.log("Logout successfully !");

    await req.user.save();
    res.render("login");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

// Create new user in the database
app.post("/register", async (req, res) => {
  try {
    const { Name, email, number, psw, pswrepeat } = req.body;

    if (psw === pswrepeat) {
      const registerEmployee = new Register({
        Name,
        email,
        number,
        psw,
        pswrepeat,
      });
      console.log("The success part : " + registerEmployee);
      const token = await registerEmployee.generateAuthToken();
      console.log("The token part " + token);

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 30000),
        httpOnly: true,
      });
      console.log(cookie);

      const registered = await registerEmployee.save();
      console.log("The token part : " + registered);
      res.status(201).render("index");
    } else {
      res.send("Passwords are not matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// login validation
app.post("/login", async (req, res) => {
  try {
    const Email = req.body.Email;
    const Password = req.body.psw;
    // console.log(`${Email} and ${Password}`);

    const userdata = await Register.findOne({ email: Email }); //first field is from the database and another is from the our fetched data
    // console.log(userdata.psw);
    // res.send(userdata.psw);
    const ismatch = await bcrypt.compare(Password, userdata.psw);

    const token = await userdata.generateAuthToken();
    console.log("The token part " + token);

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 150000),
      httpOnly: true,
    });

    if (ismatch) {
      // if (userdata && userdata.psw === Password) {
      // Use res.redirect to redirect to the "index" page upon successful login
      res.status(201).redirect("/"); // You can specify the URL where you want to redirect the user.
    } else {
      res.send("Password is not matching");
    }
  } catch (error) {
    res.status(400).send("Invalid data");
  }
});

// Define a catch-all route for 404 errors.
app.get("*", (req, res) => {
  res.render("404error", { errormsg: "OOPS! Page not found" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
