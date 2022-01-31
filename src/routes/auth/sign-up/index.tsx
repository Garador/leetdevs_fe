import * as React from 'react';
import { AuthenticationManager } from '../../../manager/Auth';

export class SignUpRoute extends React.Component {

    state = {
        form: {
            email: "",
            email2: "",
            password: ""
        }
    }

    constructor(props:any){
        super(props);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleInputUpdate = this.handleInputUpdate.bind(this);
    }

    showSuccessMessage(){
        window.alert("You will now be redirected to the posts page.")
    }

    showErrorMessage(error:string = "An error has occurred. Please try again."){
        window.alert(error);
    }

    async handleSignUp(event:React.SyntheticEvent){
        event.preventDefault();
        console.log({form: this.state.form});
        try{
            const result = await AuthenticationManager.instance.signUp(this.state.form.email, this.state.form.password)
            console.log({result});
            if(result){
                this.showSuccessMessage();
            }
        }catch(handleSignUp){
            console.log({handleSignUp});
            this.showErrorMessage();
        }
    }

    handleInputUpdate(event:any){
        this.setState((prevState:any)=>{
            prevState.form[event.target.id] = event.target.value;
            return prevState;
        })
    }


    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <h1>Sign Up</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xs-12 col-sm-4'></div>
                    <div className='col-xs-12 col-sm-4'>
                        <form onSubmit={this.handleSignUp}>
                            <div className="form-group">
                                <label custom-for="email">Email address</label>
                                <input  onInput={this.handleInputUpdate} type="email" className="form-control" id="email" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <label custom-for="email2">Repeat Your Email address</label>
                                <input  onInput={this.handleInputUpdate} type="email" className="form-control" id="email2" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <label custom-for="password">Password</label>
                                <input  onInput={this.handleInputUpdate} type="password" className="form-control" id="password" placeholder="Password"/>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-info">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className='col-xs-12 col-sm-4'></div>
                </div>
            </div>
        )
    }

}