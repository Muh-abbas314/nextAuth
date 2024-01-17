import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials"
import {users} from "@/helpers/constants"
import { connectToDatabase } from "@/helpers/server-helper";
import prisma from "@/prisma";
import bcrypt from 'bcrypt'
// import const
// import GoogleProvider from 'next-auth/providers/google'

export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            name:"creds",
            credentials:{
               email:{label:"Email",placeholder:"Enter Email"} ,
               password:{label:"Password",placeholder:"Enter Password"},
            },
            async authorize(credentials){
                if(!credentials || !credentials.email || !credentials.password)
                  return null
                try {
                    await connectToDatabase()
                const user=await prisma.user.findFirst({
                    where:{email:credentials.email},
                });

               if(!user?.hashedPassword)
               {
                return null;
               }
               const isPasswordCorrect=await bcrypt.compare(credentials.password,user.hashedPassword)
               if(isPasswordCorrect)
               {
                return user
               }
                return null;
                } catch (error) {
                    return null; 
                } finally{
                    await prisma.$disconnect()
                }
                
            },
        })
    ],
    secret:process.env.NEXTAUTH_SECRET,
}
const handler=NextAuth(authOptions)

export {handler as GET, handler as POST}