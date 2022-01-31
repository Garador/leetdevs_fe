import * as React from 'react';
import { IPostCreationPayload } from '../../../interfaces';
import { AuthenticationManager } from '../../../manager/Auth';
import { PostManager } from '../../../manager/Post';

export class CreatePost extends React.Component {

    state: {
        form: IPostCreationPayload,
        image_prev_64: {
            [key:string]: string
        }
    } = {
        form: {
            title: "",
            html_content: "",
            media: null as any
        },
        image_prev_64: {}
    }

    constructor(props:any){
        super(props);
        this.handlePostCreation = this.handlePostCreation.bind(this);
        this.handleInputUpdate = this.handleInputUpdate.bind(this);
        this.handleFileSelection = this.handleFileSelection.bind(this);
    }

    showSuccessMessage(){
        window.alert("You will now be redirected to the posts page.")
    }

    showErrorMessage(error:string = "An error has occurred. Please try again."){
        window.alert(error);
    }

    async handlePostCreation(event:React.SyntheticEvent){
        event.preventDefault();
        console.log({form: this.state.form});
        try{
            const result = await PostManager.instance.createPost(this.state.form, "all");
            console.log({result});
            //console.log({result});
            //const result = await AuthenticationManager.instance.signUp(this.state.form.email, this.state.form.password)
            //console.log({result});
            //if(result){
            //    this.showSuccessMessage();
            //}
        }catch(handlePostCreation){
            console.log({handlePostCreation});
            this.showErrorMessage();
        }
    }

    handleInputUpdate(event:any){
        this.setState((prevState:any)=>{
            prevState.form[event.target.id] = event.target.value;
            return prevState;
        })
    }

    async handleFileSelection(event:any){
        const {target} = event;
        const {id} = target;
        const {files} = target;
        const file = files[0];
        this.setState((val:any)=>{
            val.form[id] = file || null;
            return val;
        })

        if(file){
            const src = await new Promise(function(accept){
                var reader = new FileReader();
                reader.onload = function(){
                    accept(reader.result);
                }
                reader.readAsDataURL(file);
            });
            this.setState((state:any)=>{
                state.image_prev_64[id] = src;
                return state;
            })
        }
    }


    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <h1>Create New Post</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-xs-12 col-sm-2'></div>
                    <div className='col-xs-12 col-sm-8'>
                        <form onSubmit={this.handlePostCreation}>
                            <div className="form-group">
                                <label custom-for="title">Title</label>
                                <input  onInput={this.handleInputUpdate} type="string" className="form-control" id="title" placeholder="Title"/>
                            </div>
                            <div className="form-group">
                                <label custom-for="title">Image</label>
                                <br/>
                                {
                                    this.state.image_prev_64['media'] ? <img
                                        style={{width: "100%"}}
                                        src={this.state.image_prev_64['media']}/> : <></>
                                }
                                <br/>
                                <input type="file" id="media" onChange={this.handleFileSelection}/>
                            </div>
                            <div className="form-group">
                                <label custom-for="html_content">Post Content</label>
                                <textarea rows={8} className="form-control" onInput={this.handleInputUpdate} id="html_content" placeholder="Content" >
                                </textarea>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-info">Create</button>
                            </div>
                        </form>
                    </div>
                    <div className='col-xs-12 col-sm-2'></div>
                </div>
            </div>
        )
    }

}