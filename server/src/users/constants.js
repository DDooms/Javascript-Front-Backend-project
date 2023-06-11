const STATUS = {
    OK: 200,
    CREATED: 201,
    UNAUTHORIZED: 401,
    CONFLICT: 409,
    SERVER_ERROR: 500,
};

const MESSAGE = {
    LOGIN_SUCCESSFUL: "Login successful",
    REGISTRATION_SUCCESSFUL: "User registered successfully",
    INVALID_CREDENTIALS: "Invalid email or password",
    EMAIL_EXISTS: "Email already exists",
    USERNAME_EXISTS: "Username already exists",
    SERVER_ERROR: "Internal Server Error",
};

module.exports = {
    STATUS,
    MESSAGE,
}
