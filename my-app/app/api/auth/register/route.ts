import { connectToDatabase } from "@/helpers/server-helper"
import { NextResponse } from "next/server"
import prisma from "@/prisma"
import bcrypt from 'bcrypt'

export const POST=async (req:Request)=>{
    try {
        const {name,email,password}=await req.json()
        if(!name||!email||!password)
        {
           return NextResponse.json({message:"Invalid Data"},{status:442})
        }
        await connectToDatabase()
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await prisma.user.create({data:{email,name,hashedPassword}})
        return NextResponse.json({message:{user}},{status:201})
    } catch (error) {
        return NextResponse.json({message:"Server Error"},{status:500})
    } finally{
     await prisma.$disconnect()
    }
}