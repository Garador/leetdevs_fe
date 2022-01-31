import { initializeApp, FirebaseApp } from "firebase/app";
import { AuthenticationManager } from "./Auth";

export class FirebaseManager {

    static _app:FirebaseApp;
    private static _instance:FirebaseManager;

    public static instance(){
        this._instance = this._instance ? this._instance : new this();
        return this._instance;
    }

    static async initialize(data:{
        redux_setUser:(payload:any) => void
    }){
        const firebaseConfig = {
            apiKey: "AIzaSyClumsRhwXGI7ZMHLjtH627ft2JIu3koUw",
            authDomain: "leetdevs-practice.firebaseapp.com",
            projectId: "leetdevs-practice",
            storageBucket: "leetdevs-practice.appspot.com",
            messagingSenderId: "141903562168",
            appId: "1:141903562168:web:d621fca1fdc4b307007b4d"
        };
        this._app = <any> initializeApp(firebaseConfig);
        AuthenticationManager.instance.initialize(data.redux_setUser)
    }
}