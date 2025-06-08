import { databases } from './appwrite';

const databaseService = {


    async getStudentCollection(dbID, colID) {
        try {
            const response = await databases.getStudentCollection(dbID, colID)
            return response.documents || [];
        }
        catch (error) {
            console.error("Error fetching student collection:", error.message);
            return { error: error.message };
        }
    }
}            

export default databaseService;