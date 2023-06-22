// pages/api/signin.ts
import { NextApiRequest, NextApiResponse } from "next";

const signinHandler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        // Handle signin logic here
        const { email, password } = req.body;

        // Example response
        res.status(200).json({ message: "User signed in successfully!" });
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
};

export default signinHandler;
