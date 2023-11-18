//Consist of schema (field) that the database will have
import mongoose from "mongoose";
//You can encrypt the password in the controller, but to make it neater just do it in the model
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Before we save (pre), run save function. This functions as a middleware
userSchema.pre('save', async function (next){
    //this means user that we created
    //if the password isn't changed in any way
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword){
    //if matched, return true
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;
