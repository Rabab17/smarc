const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

let users = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, "firstName is required"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    nationality: {
      type: String,
      required: [true, "nationality is required"],
    },
    numberOfMembers: {
      type: Number,
      required: [true, "numberOfMembers are required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "phoneNumber is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      match: [
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must be at least 8 characters long and contain at least one letter and one number.",
      ],
    },
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["admin", "user", "owner"],
    },
    active: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

users.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hashSync(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});

const userModel = mongoose.model("User", users);
module.exports = userModel;
