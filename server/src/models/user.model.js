import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true, // Prevents duplicate usernames
      trim: true, // Removes extra spaces
      lowercase: true,
      minLength: [3, "Username must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    //   match: [
    //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    //     "Please fill a valid email address",
    //   ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // Prevents password from being returned in API queries by default
    },
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt'
  },
);
userSchema.pre("save", async function () {
  // 1. You must use 'isModified("password")' as a function
  if (!this.isModified("password")) {
    return ;
  }

  try {
    // 2. Correct way to hash: generate salt then hash, or just use bcrypt.hash
    return this.password = await bcrypt.hash(this.password, 10);

    
  } catch (error) {
    console.log(error)
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// Create the model
export const userModel = mongoose.model("User", userSchema);

;
