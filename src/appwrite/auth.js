import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client;
    account;

    constructor(){
        this.client = new Client().setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
        this.account = new Account(this.client);
    }

    //services
    async createAccount(email, password, name){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                return await this.login(email, password);
            } else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login(email, password){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        } catch(error){
            throw error
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        } catch(error){
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout(){
        try{
            return await this.account.deleteSessions();
        } catch(error){
            throw error
        }
    }
}

const authService = new AuthService();

export default authService;