const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //this is the tool used to hash the passwords to keep them private

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
});

//before saving the user, we need to hash the passport. We will do that using a Hook
userSchema.pre('save', async function(next){
    try{
        if(!this.isModified('password')){ //we are checking if the user has not modified the password
            return next(); //basically, if the password is unchanged, there's no need to go and change it again. This next refers to the argument in the async function
        }
        let hashedPassword = await bcrypt.hash(this.password, 10); //the second parameter adds salting, basically to make it more secure. It is an additional step. The await is used because it's an asynchronous action
        this.password = hashedPassword;
        return next();
    } catch(err){
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword, next){
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch; //will compare the input password to see if it is the same as the encrypted password.
    } catch(err){
        return next(err);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;