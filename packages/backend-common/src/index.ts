const JWT_KEY_VALUE = process.env.JWT_KEY;

if (!JWT_KEY_VALUE && process.env.NODE_ENV === "production") {
  throw new Error("JWT_KEY environment variable is required in production");
}

export const JWT_KEY = JWT_KEY_VALUE || "asdfghg";
