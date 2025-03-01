const express = require("express");
const supertest = require("supertest");
const userController = require("../controllers/users");
const userRoutes = require("../routes/users");

// Mock the user controller
jest.mock("../controllers/users");

// Create an Express app for testing
const app = express();
app.use(express.json());
app.use("/users", userRoutes);

describe("User Routes", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Reset all mocks before each test
    });

    it("should create a new user", async () => {
        // Firstly you mock the controller's response
        userController.registerUser.mockImplementation((req, res) => {
            return res.status(201).json({ message: "User registered successfully" });
        });

        // Make a POST request using Supertest
        const response = await supertest(app).post("/users/register").send({
            name: "testUser",
            email: "test@gmail.com",
            password: "testPassword",
            preferences: ["technology", "sports"]
        });

        // Assertions
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: "User registered successfully" });

        // Check if the mocked controller was called
        expect(userController.registerUser).toHaveBeenCalled();
    });

    it("should login a user", async () => {
        // Firstly you mock the controller's response
        userController.loginUser.mockImplementation((req, res) => {
            return res.status(200).json({ message: "User Logged In", token: "token" });
        });

        // Make a POST request using Supertest
        const response = await supertest(app).post("/users/login").send({
            email: "test@gmail.com",
            password: "testPassword"

});
expect(response.status).toBe(200);
expect(response.body).toEqual({ message: "User Logged In", token:"token"});
expect(userController.loginUser).toHaveBeenCalled();
    });
});