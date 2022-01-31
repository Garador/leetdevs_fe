import { getAuth, sendEmailVerification, Auth, createUserWithEmailAndPassword } from "firebase/auth";
import Axios from 'axios';
import { IPostCreationPayload, IPostItem } from "../interfaces";
import { AuthenticationManager } from "./Auth";

export class PostManager {

    static _instance: PostManager;
    private _votePostExpire: (data:any) => void;
    private _setCollection: (data:any) => void;
    private _setPost: (data:any) => void

    constructor(){
        this._votePostExpire = <any> null;
        this._setCollection = <any> null;
        this._setPost = <any> null;
    }

    static get instance(){
        this._instance = this._instance ? this._instance : new PostManager();
        return this._instance;
    }

    static initialize(object:{
        setPostExpiryDate:(data:any) => void,
        setCollection: (data:any) => void,
        setPost: (data:any) => void
    }){
        this.instance._votePostExpire = object.setPostExpiryDate;
        this.instance._setCollection = object.setCollection;
        this.instance._setPost = object.setPost;
    }

    async postVoteUp(postId: string, collection:string){
        try{
            let token = await AuthenticationManager._instance.user?.getIdToken();
            const response = await Axios.post(`http://localhost:3000/vote/post/${postId}`, {
                action: "UP"
            }, {
                headers: {
                    Authorization: "Bearer "+token
                }
            });
            const {data} = response;
            console.log({
                data, collection
            });
            const record:IPostItem = data.data;
            this._setPost({record, collection});
        }catch(postVoteUpError){
            throw postVoteUpError;
            console.log({postVoteUpError});
        }
    }

    async createPost(postData:IPostCreationPayload, colToAdd:string){
        try{
            if(!AuthenticationManager._instance.user){
                throw new Error("User must be logged in to create a post.");
            }
            const form_data = new FormData();
            form_data.append("media", postData.media);
            form_data.append("html_content", postData.html_content);
            form_data.append("title", postData.title);
            let token = await AuthenticationManager._instance.user?.getIdToken();
            const response = await Axios.post(`http://localhost:3000/post`, form_data, {
                headers: {
                    Authorization: "Bearer "+token,
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log({response});
        }catch(createPostError){
            console.log({createPostError});
        }
    }

    setCollection(postData: IPostItem[], colToAdd: string){
        console.log({
            setCollection: {
                postData, colToAdd
            }
        });
        this._setCollection({
            collection: colToAdd,
            records: postData
        });
    }
}