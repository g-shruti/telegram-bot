const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.put('/:id/block', userController.toggleBlockUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
