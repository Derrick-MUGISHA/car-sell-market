import { AUTH_COOKIE_NAME } from "@/constants/server";
import { APP_CONFIG } from "@/lib/app-config";
import { createAdminClient } from "@/lib/appwrite";
import { signupSchema } from "@/validation/auth.validation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ID } from "node-appwrite";



export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log(body);
        const {
            name,
            email,
            password,
            ShopName,
        } = await signupSchema.parse(body);

        const { account, database } = await createAdminClient();
        console.log(account);
        
        const user = await account.create(
            ID.unique(), email, password, name
        );
        console.log(user);
        const session = await account.createEmailPasswordSession(email, password,
        );

        console.log(session);
        const confirm = await database.createDocument(
            APP_CONFIG.APPWRITE.DATABASE_ID,
            APP_CONFIG.APPWRITE.SHOP_ID,
            ID.unique(),
            {
                ShopName: ShopName,
                userId: user.$id,
            }
        );
        console.log(confirm);
        cookies().set(AUTH_COOKIE_NAME, session.secret, {
            path: '/',
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });

        console.log({
            userId: user.$id,
            shopId: confirm.$id
        })

        return NextResponse.json({
            message: "User created successfully",
            userId: user.$id,
            shopId: confirm.$id,
        })
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message,
            },
            {
                status: 500,
            },
        );
    }
}