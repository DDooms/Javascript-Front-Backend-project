const pool = require('../../db');
const queries = require('./queries');
const bcrypt = require('bcrypt');
const { STATUS, MESSAGE } = require('./constants');

const getUsers = async (req, res) => {
    try {
        const result = await pool.query(queries.getUsers);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

// async/await are used for promises,
// because the pool.query() method typically returns a promise in order to handle asynchronous operations.

const getUserByUsername = async (req, res) => {
    const username = req.params;
    try {
        const result = await pool.query(queries.getUserByUsername, [username]);
        if (result.rows.length === 0) {
            res.status(404).send("User not found");
        } else {
            res.status(200).json(result.rows);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

// [username], by wrapping the dynamic argument with [], you can pass an actual username

const addUser = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const usernameCheck = await pool.query(queries.checkIfUsernameExists, [username]);
        const emailExistsCheck = await pool.query(queries.checkIfEmailExists, [email]);

        if (!email.match(/^[^@]+@[^@]+\.[^.]+$/)) {
            res.status(400).send("Invalid email format");
        } else if (emailExistsCheck.rows.length) {
            res.status(409).send("Email already exists");
        } else if (usernameCheck.rows.length) {
            res.status(409).send("Username already exists");
        } else {
            await pool.query(queries.addUser, [username, email, password]);
            res.status(201).send("User created successfully");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

/*const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, surname, username, email, dob } = req.body;

    try {
        const user = await pool.query(queries.getUserById, [id]);
        if (user.rows.length === 0) {
            res.status(404).send("User not found");
            return;
        }

        await pool.query(queries.updateUser, [name, surname, username, email, dob, id]);
        res.status(200).send("User successfully updated");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};*/

const deleteUser = async (req, res) => {
    const {username} = req.params;

    try {
        const user = await pool.query(queries.getUserByUsername, [username]);

        if (user.rows.length === 0) {
            res.status(404).send("User not found");
            return;
        }

        await pool.query(queries.deleteUser, [username]);
        res.status(200).send("User successfully deleted");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const registerUser = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const usernameCheck = await pool.query(queries.checkIfUsernameExists, [username]);
        const emailExistsCheck = await pool.query(queries.checkIfEmailExists, [email]);

        if (emailExistsCheck.rows.length) {
            res.status(STATUS.UNAUTHORIZED).send(MESSAGE.EMAIL_EXISTS);
        } else if (usernameCheck.rows.length) {
            res.status(STATUS.UNAUTHORIZED).send(MESSAGE.USERNAME_EXISTS);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(queries.addUser, [username, email, hashedPassword]);
        res.status(STATUS.CREATED).send(MESSAGE.REGISTRATION_SUCCESSFUL);
        // MAYBE ADD CONSTANTS FOR THESE STATUSES

    } catch (error) {
        console.error(error);
        res.status(STATUS.SERVER_ERROR).send(MESSAGE.SERVER_ERROR);
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query(queries.getUserByEmail, [email]);

        if (user.rows.length === 0) {
            return res.status(STATUS.UNAUTHORIZED).send(MESSAGE.INVALID_CREDENTIALS);
        }

        const hashedPassword = user.rows[0].password;
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (passwordMatch) {
            res.status(STATUS.OK).send(MESSAGE.LOGIN_SUCCESSFUL);
        } else {
            res.status(STATUS.UNAUTHORIZED).send(MESSAGE.INVALID_CREDENTIALS);
        }

    } catch (error) {
        console.error(error);
        res.status(STATUS.SERVER_ERROR).send(MESSAGE.SERVER_ERROR);
    }
};



module.exports = {
    getUsers,
    getUserByUsername,
    addUser,
    // updateUser,
    deleteUser,
    registerUser,
    loginUser,
};
