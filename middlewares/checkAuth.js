2;
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      const decode = jwt.verify(token, 'secret');
      req.userID = decode._id;
      next();
    } catch (error) {
      res.status(403).json({
        message: 'You do not have permission',
      });
    }
  } else {
    res.status(403).json({
      message: 'You do not have permission',
    });
  }
};
