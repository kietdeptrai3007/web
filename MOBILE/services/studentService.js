import databaseService from "./databaseService";
import { ID } from "react-native-appwrite";

//appwrite database service for student operations

const dbID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const colID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_STUDENT_ID;

const studentService = {
    async getStudentCol() {

        const response = await databaseService.getStudentCollection(dbID, colID);
        if (response.error) {
            return { error: response.error };
        }
        return { data: response };
    },

};

export default studentService;