export default {
  jwt: {
    secret: process.env.APP_JWT_SECRET,
    expiresIn: process.env.APP_JWT_EXPIRES,
  },
};
