import "dotenv/config";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

export const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "1d",
  },
};
