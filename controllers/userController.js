const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const User = require('../models/User');
const bcrypt = require('bcrypt');

/*
200 --- OK! 
400 --- User End 
500 --- Server/App End
*/

// @desc      Get all users
// @route     GET /api/users
// @access    Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc      Get single user
// @route     GET /api/users/:id
// @access    Private
exports.getLoggedUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return next(new ErrorResponse(404, 'User not found'));
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Get single user/Login user
// @route     POST /api/users/login
// @access    Private
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorResponse(403, 'Fields missing'));
  const user = await User.findOne({ email });
  if (!user) return next(new ErrorResponse(404, 'User not found'));
  console.log(password, '\n', user.password);
  await bcrypt.compare(password, user.password, (err, same) => {
    if (err) return next(new ErrorResponse(500, 'Failed to compare password'));
    if (same) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      return next(new ErrorResponse(401, 'Passwords do not match'));
    }
  });
});

// @desc      Create user
// @route     POST /api/users
// @access    Private
exports.createUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { password } = req.body;
  if (!password) return next(new ErrorResponse(400, 'Fields missing'));
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc      Update user
// @route     PUT /api/update/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Delete user
// @route     DELETE /api/delete/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
  });
});
