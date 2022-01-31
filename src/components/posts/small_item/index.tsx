import * as React from 'react';
import { IPostItem } from '../../../interfaces';
import {Link} from 'react-router-dom'
import styleClasses from "./index.module.css";
import { SmallTimer } from '../../timer/small';
import { PostManager } from '../../../manager/Post';


export class PostSmallItem extends React.Component<{
    post: IPostItem,
    collection: string
}> {

    constructor(props:any){
        super(props);
        this.postVoteUp = this.postVoteUp.bind(this);
    }

    async postVoteUp(){
        try{
            await PostManager.instance.postVoteUp(this.props.post.id, this.props.collection);
        }catch(e){
            console.log({e});
            throw e;
        }
    }

    render(){
        const {post} = this.props;
        return (
            <div className={styleClasses['post-small-item']}>
                <Link to={`/posts/${post.slug}`} className={styleClasses['unstyled-item']}>
                    <div className={styleClasses['media-container']}>
                        <div className={styleClasses['media-container-img']} 
                        style={{
                            backgroundImage: `url("${post.poster_image ? post.poster_image.url : ""}")`
                        }}>
                        </div>
                    </div>
                    <div className={styleClasses['title']}>
                        <h3>{post.title}</h3>
                        <br/>
                        <div>
                            Time Left: <SmallTimer endDate={new Date(post.expires_at)}/>
                        </div>
                    </div>
                </Link>
                <div className={styleClasses['post-context']}>
                    <p>{post.extract.length > 200 ? `${post.extract.substring(0, 200)}...` : post.extract}</p>
                </div>
                <div className={styleClasses['post-actions']}>
                    <button className='btn btn-success' onClick={this.postVoteUp}>Vote Up!</button>
                </div>
            </div>
        )
    }
}