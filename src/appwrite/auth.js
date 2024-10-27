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
            console.error("Authservice :: createAccount :: ", error);
            throw error;
        }
    }

    async login(email, password){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        } catch(error){
            console.error("Authservice :: login :: ", error);
            throw error
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        } catch(error){
            console.error("Authservice :: getCurrentUser :: ", error);
        }

        return null;
    }

    async logout(){
        try{
            return await this.account.deleteSessions();
        } catch(error){
            console.error("Authservice :: deleteSessions :: ", error);
        }
    }

    async updateName(newName) {
        try {
            return await this.account.updateName(newName);
        } catch (error) {
            console.error("Authservice :: updateUserName :: ", error);
            throw error;
        }
    }

    async updateEmail(newEmail, password) {
        try {
            return await this.account.updateEmail(newEmail, password);
        } catch (error) {
            console.error("Authservice :: updateEmail :: ", error);
            throw error;
        }
    }
    
    async resetPassword(newPassword, oldPassword) {
        try {
            return await this.account.updatePassword(newPassword, oldPassword)
        } catch (error) {
            console.error("Authservice :: resetPassword :: ", error);
            throw error;
        }

    }

}

const authService = new AuthService();

export default authService;