import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY
}