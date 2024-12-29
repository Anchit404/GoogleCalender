import mongoose from 'mongoose'; // Import mongoose
const { Schema } = mongoose; // Destructure Schema from mongoose

const userSchema = new Schema({

  googleId: {
     type: String,
      required: true,
       unique: true 
    },
  email: {
     type: String, 
     required: true, 
     unique: true
     },
  accessToken: {
     type: String, 
     required: true 
    },
  refreshToken: 
  { type: String,
    required: true 
},

});

const User = mongoose.model('User', userSchema);
export default User;
