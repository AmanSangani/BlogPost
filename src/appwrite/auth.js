import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appWriteURL)
            .setProject(config.appWriteProjectID);
        this.account = new Account(this.client);
    }

    async createAccount(email, password, name) {
        try {
            const userAcc = await this.account.create(
                ID.unique,
                email,
                password,
                name,
            );
            if (userAcc) {
                //login
                return this.login(email, password);
            } else {
                return userAcc;
            }
        } catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
