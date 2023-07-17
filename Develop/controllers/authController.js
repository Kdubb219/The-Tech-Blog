// controllers/authController.js
const db = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
  signupForm: (req, res) => {
    res.render('signup');
  },

  signup: async (req, res) => {
    const { email, password } = req.body;

    try {
      const existingUser = await db.User.findOne({ where: { email } });
      if (existingUser) {
        return res.render('signup', { error: 'User already exists' });
      }

      await db.User.create({ email, password });

      req.session.isLoggedIn = true;
      req.session.email = email;

      res.redirect('/');
    } catch (err) {
      console.error('Error creating user:', err);
    }
  },

  loginForm: (req, res) => {
    res.render('login');
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await db.User.findOne({ where: { email } });
      if (!user) {
        return res.render('login', { error: 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.render('login', { error: 'Invalid email or password' });
      }

      req.session.isLoggedIn = true;
      req.session.email = email;

      res.redirect('/');
    } catch (err) {
      console.error('Error logging in:', err);
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  }
};


