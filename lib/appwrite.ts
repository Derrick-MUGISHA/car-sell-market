import "server-only";

import { Client } from 'node-appwrite';
import { Account } from 'node-appwrite';
import { APP_CONFIG } from './app-config';
import { cookies } from "next/headers";

export async function createAdminClient() {
    const client = new Client()
      .setEndpoint(APP_CONFIG.APPWRITE.ENDPOINT)
      .setProject(APP_CONFIG.APPWRITE.PROJECT_ID)
      .setKey(APP_CONFIG.APPWRITE.KEY);
  
    return {
      get account() {
        return new Account(client);
      },
    };
  }



  export async function createSessionClient() {
    const client = new Client()
      .setEndpoint(APP_CONFIG.APPWRITE.ENDPOINT)
      .setProject(APP_CONFIG.APPWRITE.PROJECT_ID);
  
    const session = await cookies().get("WALL_MARK_CARE");
    if (!session || !session.value) {
      throw new Error("No session");
    }
  
    client.setSession(session.value);
  
    return {
      get account() {
        return new Account(client);
      },
    };
  }