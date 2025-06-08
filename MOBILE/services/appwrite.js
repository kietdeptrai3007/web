import {Client, Databases, Query} from 'react-native-appwrite';
import { Platform } from 'react-native';


const APPWRITE_PROJECT_ID = "grade-view-app";
const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT, // Your Appwrite Endpoint
  project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID, // Your project ID
    db: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID, // Your database ID
  col:{
    student: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_STUDENT_ID, 
    // Your collection ID for students
    lecturer: process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_LECTURER_ID,
  }
};
const client = new Client()

  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.project); // Your project ID

  switch (Platform.OS) {
    case 'ios':
      client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM );
      break;
    case 'android':
      client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME);
      break;
  }

const account = new Account(client);


 const databases = new Databases(client);

 export {databases, config, client};
  