const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { UserService } = require('../services');

require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const services = new UserService();

      const user = await services.findById(payload.id);

      if (!user) {
        return done(new Error('User not Found'));
      }
      if (!user.token) {
        return done(null, false);
      }
      return done(null, user);
    } catch (e) {
      console.log('object');
      done(e);
    }
  })
);
