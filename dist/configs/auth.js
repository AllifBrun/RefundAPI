"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
require("dotenv/config");
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is required");
}
exports.authConfig = {
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: "1d",
    },
};
