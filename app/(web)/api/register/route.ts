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
    console.log('Request Body:', body);
    const { email, name, password, shopName } = await signupSchema.parse(body);

    const { account, database } = await createAdminClient();
    
    // Create user
    const user = await account.create(ID.unique(), email, password, name);
    console.log('User Created:', user);

    // Create session
    const session = await account.createEmailPasswordSession(email, password);
    console.log('Session Created:', session);

    try {
      // Create shop document
      const shop = await database.createDocument(
        APP_CONFIG.APPWRITE.DATABASE_ID,
        APP_CONFIG.APPWRITE.SHOP_ID,
        ID.unique(),
        {
          shopName: shopName,
          userId: user.$id,
        }
      );
      console.log('Shop Created:', shop);
    } catch (error) {
      console.error('Error creating shop document:', error);
      throw new Error('Failed to create shop document.');
    }

    // Set auth cookie
    cookies().set(AUTH_COOKIE_NAME, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json({
      message: "User created successfully",
      userId: user.$id,
    });
  } catch (error: any) {
    console.error('Error in registration process:', error);
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
