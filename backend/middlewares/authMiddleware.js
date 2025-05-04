const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/appError');

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Vous n\'êtes pas connecté. Veuillez vous connecter pour accéder.', 401));
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('L\'utilisateur associé à ce token n\'existe plus.', 401));
    }

    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};
