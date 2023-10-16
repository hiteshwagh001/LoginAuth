const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const employeeSchema = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  number: {
    type: Number,
    require: true,
    unique: true,
  },
  psw: {
    type: String,
    require: true,
  },
  pswrepeat: {
    type: String,
    require: true,
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
});

// tokens
employeeSchema.methods.generateAuthToken = async function () {
  try {
    console.log(this._id);
    const token = jwt.sign({ _id: this.id.toString() }, process.env.SECRET_KEY);

    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    res.send("the error part " + error);
    console.log("error part is " + error);
  }
};
// applying hashing on the password
employeeSchema.pre("save", async function (next) {
  if (this.isModified("psw")) {
    // const passwordHash = await bcrypt.hash(psw, 10);
    console.log(`current password is : ${this.psw}`);
    this.psw = await bcrypt.hash(this.psw, 10);
    console.log(`current password is : ${this.psw}`);

    this.pswrepeat = undefined;
  }
});




// now we need to create collection

const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;
