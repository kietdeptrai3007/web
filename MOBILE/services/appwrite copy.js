// src/lib/appwrite.js

import { Client, Account, Databases } from 'appwrite';

const EXPO_PUBLIC_APPWRITE_ENDPOINT = "https://fra.cloud.appwrite.io/v1"; // hoặc endpoint riêng của bạn
const EXPO_PUBLIC_APPWRITE_PROJECT_ID = "grade-view-app"; // hoặc ID thực tế trên Appwrite Console

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
