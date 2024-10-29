import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";
import { nanoid } from "nanoid";

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
                slug + '--' + nanoid(4),
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.error("DBService :: createPost :: ", error);
            return false
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
            console.error("DBService :: updatePost :: ", error);
            return false
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
            console.error("DBService :: deletePost :: ", error);
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
            console.error("DBService :: getPost :: ", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","public")]){
        try{
            return await this.databases.listDocuments(
                conf.databaseId, 
                conf.collectionId, 
                queries
            )
        } catch(error){
            console.error("DBService :: getPosts :: ", error);
            return false;
        }
    }

    // bucket/storage

    async uploadFile(file){
        try{
            return await this.storage.createFile(
                conf.bucketId,
                ID.unique(), 
                file
            )
        } catch(error){
            console.error("DBService :: uploadFile :: ", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.storage.deleteFile(
                conf.bucketId,
                fileId 
            );
            return true;
        } catch(error){
            console.error("DBService :: deleteFile :: ", error);
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