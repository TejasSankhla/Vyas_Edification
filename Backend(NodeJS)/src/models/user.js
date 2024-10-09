import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";

// Roles -> p0(admin), p1, p2
const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
    },
    roles: {
      type: [String],
      require: true,
    },
  },
  {
    timestamps: {
      createdAt: "admission_date", // Use `created_at` to store the created date
      updatedAt: "last_updated", // and `updated_at` to store the last updated date
    },
  }
);

userSchema.pre("save", async function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
userSchema.methods.createToken = function (user) {
  const token = jwt.sign(
    {
      data: user,
    },
    "secret",
    { expiresIn: "1h" }
  );
  return token;
};
const User = mongoose.model("User", userSchema);
export default User;
