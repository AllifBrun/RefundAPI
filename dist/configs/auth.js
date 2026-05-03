"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
require("dotenv/config");
exports.authConfig = {
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: "1d",
    },
};
