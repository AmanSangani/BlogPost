import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appWriteURL)
            .setProject(config.appWriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                },
            );
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                },
            );
        } catch (error) {
            console.log(error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
            );
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
            );
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.getListDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                queries,
            );
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    //file upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appWriteBucketID,
                ID.unique(),
                file,
            );
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(config.appWriteBucketID, fileId);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(config.appWriteBucketID, fileId);
    }
}

const service = new Service();
export default service;
