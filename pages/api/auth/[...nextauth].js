import connectDB from "@/libs/connectDB";
import User from "../../../models/dbschema"; 
import Message from "../../../models/Message";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import queryData from "./query";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
let userAccount;
export const authOptions = {
    providers: [
        CredentialsProvider({
            id:"credentials",
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                try {
                    await connectDB();
                    const user = await User.findOne({ email: credentials?.email });
                    
                    if (!user) {
                        throw new Error("User not found"); // Throw an error if user is not found
                    }
                    console.log(user);
                    const passwordMatch = await bcrypt.compare(credentials?.password, user.password);
                    if (credentials.email === user.email && passwordMatch) {
                         userAccount = {
                            userID: user._id,
                            firstName: user.firstName,
                            surname: user.surname,
                            email: user.email,
                            role: user.role,
                            receivedMessages: user.receivedMessages,
                            medications: user.medications,
                            password: user.password,
                        };
                        return userAccount; // Resolve with user account data
                    } else {
                        throw new Error("Invalid password"); // Throw an error if password doesn't match
                    }
                } catch (err) {
                    console.error("Error: ", err);
                    throw new Error("Authentication failed"); // Throw a generic error for other exceptions
                }
            }
            
            
        }),
    ],
    jwt: {
        encryption: true,
     
    },
    session: {
        strategy: "jwt",
        jwt: true
    },
    callbacks: {
    
          async session(session) {
            if(session) {
                session.user = {
                    id: userAccount.userID,
                    firstName: userAccount.firstName,
                    surname: userAccount.surname,
                    email: userAccount.email,
                    receivedMessages: userAccount.receivedMessages,
                    medications: userAccount.medications,
                    password: userAccount.password,
                };
             
            }
            console.log(session.user);
            return session;

        },
        async signIn(user, account, profile){
            try {
                // Generate JWT token
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
        
                // Encode token for URL
                const encodedToken = encodeURIComponent(token);
        
                // Construct the redirect URL with the token as a query parameter
                const redirectUrl = `/?token=${encodedToken}`;
        
                // Return a 302 (temporary) redirect response with the URL in the Location header
                return {
                    statusCode: 302,
                    headers: {
                        Location: redirectUrl,
                    },
                };
            } catch (error) {
                console.error('Error generating token:', error);
                throw new Error('Failed to generate token');
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
        callBackUrl: "/"
    },
};
const handler = NextAuth(authOptions);

export default handler;
export const GET = (req, res) => handler.handleRequest(req, res, { ...authOptions });
export const POST = (req, res) => handler.handleRequest(req, res, { ...authOptions });