import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

class UserController {
  async register(req, res) {
    try {
      const pass = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(pass, salt);

      const doc = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        avatarURL: req.body.avatarURL,
      });

      const user = await doc.save();

      const token = jwt.sign({ _id: user._id }, 'secret', { expiresIn: '30d' });

      const { password, ...userData } = user._doc;

      res.json({
        ...userData,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Try to enter a new email',
        error,
      });
    }
  }

  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ message: 'User is not found' });
      }
      const isValidPass = await bcrypt.compare(req.body.password, user._doc.password);

      if (!isValidPass) {
        return res.status(400).json({ message: 'The user name or password is incorrect' });
      }

      const token = jwt.sign({ _id: user._id }, 'secret', { expiresIn: '30d' }); // при авторизации сформируется новый токен
      const { password, ...userData } = user._doc;

      res.json({
        ...userData,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Authorization is unsuccessful',
        error,
      });
    }
  }

  async getMe(req, res) {
    try {
      const user = await User.findById(req.userID);

      if (!user) {
        return res.status(404).json({
          message: 'User if not found',
        });
      }

      const { password, ...userData } = user._doc;

      res.status(200).json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'You do not have permission',
        error,
      });
    }
  }
}

export default new UserController();
