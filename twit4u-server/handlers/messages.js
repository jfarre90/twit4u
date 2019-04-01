const db = require('./models');

exports.createMessage = async function(req,res,next) {
   try{
       let message = await db.message.create({
           text: req.body.text,
           user: req.params.id //this id will be in the URL and we will grab it from there.
       });
       let foundUser = await db.User.findById(req.params.id);
       foundUser.messages.push(message.id);
       await foundUser.save();
       let foundMessage = db.Message.findById(message._id).populate("user", {
           username: true,
           profileImageUrl: true
       });
       return res.status(200).json(foundMessage);
   } catch(e) {}
}

//GET /api/users/:id/messages/:messages_id
exports.getMessage = async function(req,res,next) {
    try {
        let message = await db.Message.find(req.params.message_id);
        return res.status(200).json(message);
    } catch (e) {
        return next(e);
    }
    
}

//DELETE /api/users/:id/messages/:messages_id
exports.deleteMessage = async function(req,res,next) {
    try {
        let foundMessage = await db.Message.findById(req.params.message._id);
        await foundMessage.remove(); //remove method declared in the message model. We cannot use the mongoose method findByIdAndRemove as it would not delete the message id in the user model.
        return res.satatus(200).json(foundMessage)
    } catch (e) {
        return next(e);
    }
    
}