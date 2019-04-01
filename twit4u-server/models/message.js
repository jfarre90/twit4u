const mongoose = require('mongoose');
const User = require('./user');

const messageSchema = new mongoose.Schema({
        text: {
            type: String,
            required: true,
            maxLength: 160
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' //This id is referenced to the user!
        }
    },
    {
        timestamps: true //adds a createdAt and updatedAt for each individual item the schema creates
    }
);

//we need to ensure that when a message is deleted, we need to ensure that the message id is also deleted from the user.
messageSchema.pre('remove', async function(next){
    try {
        //find a user
        let user = await User.findById(this.user);
        //remove the id of the message from their messages list
        user.messages.remove(this.id); //here this is referring to the message.
        //save that user
        await user.save();
        //return next
        return next();
    }catch (e) {
        return next(e);
    }
    
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;