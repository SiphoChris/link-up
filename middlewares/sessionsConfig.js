import session from 'express-session';
import RedisStore from '../config/sessions.js'; 
import {redisClient} from '../config/index.js';

const redisStore = new RedisStore(redisClient);

// Session middleware configuration
export const sessionMiddleware = session({
  store: redisStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 3600 * 1000 // Session cookie expiration (1 hour)
  }
});
