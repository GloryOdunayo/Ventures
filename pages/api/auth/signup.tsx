// pages/api/signup.ts
import { NextApiRequest, NextApiResponse } from "next";

const signupHandler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        // Handle signup logic here
        const { username, email, password } = req.body;

        // Example response
        res.status(200).json({ message: "User signed up successfully!" });
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
};

export default signupHandler;
