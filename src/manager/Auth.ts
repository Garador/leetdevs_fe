import { getAuth, sendEmailVerification, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export class AuthenticationManager {

    static _instance: AuthenticationManager;
    private _auth: Auth;

    constructor(){
        this._auth = <any> null;
    }

    static get instance(){
        this._instance = this._instance ? this._instance : new AuthenticationManager();
        return this._instance;
    }

    initialize(setUser:(data:any) => void){
        this._auth = getAuth();
        this._auth.onAuthStateChanged((userData)=>{
            let data = JSON.parse(JSON.stringify(userData))
            setUser(data);
        })
    }

    get user(){
        return this._auth.currentUser;
    }

    async signUp(email:string, password:string){
        try{
            await createUserWithEmailAndPassword(this._auth, email, password);
            if(this._auth.currentUser){
                await sendEmailVerification(this._auth.currentUser);
                console.log("Sent email verification");
            }
            return this._auth.currentUser;
        }catch(signUpError){
            console.error({signUpError})
            return null;
        }
    }

    async signIn(email:string, password:string){
        try{
            await signInWithEmailAndPassword(this._auth, email, password);
            return this._auth.currentUser;
        }catch(signUpError){
            console.error({signUpError})
            return null;
        }

    }
}