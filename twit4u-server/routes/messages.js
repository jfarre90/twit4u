const express = require('express');
const router = express.Router({mergeParams: true}); //allows us to access the id inside this router

const { 
    createMessage,
    getMessage,
    deleteMessage
} = require('../handlers/messages');


//prefix - /api/users/:id/messages
router.route('/').post(createMessage);


router
    .route('/:message_id')
    .get(getMessage)
    .delete(deleteMessage);

//prefix - /api/users/:id/messages
router.route('/').post(createMessage);

module.exports = router;