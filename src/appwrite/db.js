import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DBService{
    client;
    databases;
    storage;

    constructor(){
        this.client = new Client().setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost(userId, {title, slug, content, featuredImage, status}){
        try {
            return await this.databases.createDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.databases.updateDocument(
                conf.databaseId, 
                conf.collectionId, 
                slug, 
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch(error){
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.databaseId, 
                conf.collectionId, 
                slug,
            )
            return true;
        } catch(error){
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.databaseId, 
                conf.collectionId, 
                slug
            )
        } catch(error){
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                conf.databaseId, 
                conf.collectionId, 
                queries
            )
        } catch(error){
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    async uploadFile(file){
        try{
            return await this.storage.createFile(
                conf.bucketId,
                ID.unique(), 
                file
            )
        } catch(error){
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.storage.createFile(
                conf.bucketId,
                fileId 
            );
            return true;
        } catch(error){
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    //not promise
    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.bucketId,
            fileId
        )
    }
}

const dbService = new DBService();
export default dbService;