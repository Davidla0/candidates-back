const { object, string } = require("zod");

const createUserSchema = object({
    body: object({
        username: string({
            required_error: "First name is required",
        }),
        password: string({
            required_error: "Password is required",
        }).min(6, "Password is too short - should be min 6 chars"),
        email: string({
            required_error: "Email is required",
        }).email("Not a valid email"),
    })
});

const loginUserSchema = object({
    body: object({
        username: string({
            required_error: "First name is required",
        }),
        password: string({
            required_error: "Password is required",
        }).min(6, "Password is too short - should be min 6 chars"),
    }),
});

module.exports = { 
    createUserSchema,
    loginUserSchema
}


