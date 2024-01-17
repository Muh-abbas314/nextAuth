import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials"
import {users} from "@/helpers/constants"
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
                {return null;}
                const user=users.find((item)=>item.email===credentials.email)
                if(user?.password===credentials.password)
                {
                    return user
                }
                return null;
            },
        })
    ],
    secret:process.env.NEXTAUTH_URL
}
const handler=NextAuth(authOptions)

export {handler as GET, handler as POST}