module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_URL: 'mongodb://127.0.0.1:27017/blog[node]',
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
    JWT_SECRET_KEY: 'dev-jwt',
};
