const { loginUser } = require("../servises/authService");
const { User } = require("../db/userModel");

require("dotenv").config();

describe("User login test", () => {
  test("Should return user data", async () => {
    const mEmail = "yurii@mail.com";
    const mPassword = "123456789";

    const user = {
      _id: "1",
      name: "Yurii",
      email: mEmail,
      subscription: "pro",
      password: "$2b$10$eSBdjuG1VUlH91YPJTsaveNeU7CqLED4m0sx/dOgwoQBpVYUUBb.m",
    };

    jest.spyOn(User, "findOne").mockImplementationOnce(() => user);
    jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(() => user);

    const result = await loginUser(mEmail, mPassword);
    console.log(typeof result.user.email);
    // expect(result.status).toEqual(200);
    expect(result.token).toBeDefined();
    expect(typeof result.user).toBe("object");
    expect(typeof result.user.email).toBe("string");
    expect(typeof result.user.subscription).toBe("string");
    // expect(result.user).toHaveLength(2);
    // expect(result.email).toBeDefined();
  });
});
