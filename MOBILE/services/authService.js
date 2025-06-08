import { accounr } from './appwrite';
import { ID } from 'react-native-appwrite';

const authService = {
    async login(email, password) {
        try {