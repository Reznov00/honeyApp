const express = require('express');
const {
  createUser,
  getLoggedUser,
  getUsers,
  loginUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.route('/all').get(getUsers);

router.route('/user/:id').get(getLoggedUser);
router.route('/login').post(loginUser);
router.route('/register').post(createUser);
router.route('/update/:id').put(updateUser);
router.route('/delete/:id').delete(deleteUser);

module.exports = router;
