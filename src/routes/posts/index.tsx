import * as React from 'react'
import { PostSmallItem } from '../../components/posts/small_item'
import { IPostItem } from '../../interfaces'
import Axios from 'axios'
import { PostManager } from '../../manager/Post'
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'

const DEF_POST:IPostItem = {
    id: "askdakjd",
    author_id: "0",
    slug: "placeholder-post",
    title: "Some Post Title Here",
    extract: "Some Post Title Content Text-only Here",
    text: "Some Post Title Content Text-only Here but also some additional content",
    expires_at: new Date(new Date().getTime() + (((60*1000)*60)*60)).getTime(),
    html_content: "<b>Some Post Title Content Text-only Here but also some additional content</b>",
    poster_image: {
        id: "string",
        url: "https://via.placeholder.com/350x150",
        alt: "Alternative Text"
    }
}

/**
 * {
    "id": 1,
    "title": "First Post",
    "extract": "First Post Title",
    "text": "First Post Title",
    "slug": "First-Post-54403",
    "expires_at": "2022-01-31T04:43:18.280Z",
    "html_content": "First Post Title",
    "poster_image": null,
    "author": {
        "id": 1,
        "email": "azolotdev@gmail.com",
        "slug": "azolotdev_60121"
    }
}
 */

export class PostsRoute extends React.Component<any> {

    state: {
        changed: number
    } = {
        changed: 0
    }

    constructor(props:any){
        super(props);
        console.log({props});
    }

    componentDidMount(){
        Axios.get("http://localhost:3000/post?collection=posts_page_small")
        .then(({data})=>{
            let posts = data.data.map((element:any) => {
                element.expires_at = new Date(element.expires_at).getTime()
                return element;
            });
            PostManager.instance.setCollection(posts, "posts_page_small");
        })
        .catch((err)=>{
            console.error({err});
        })
    }

    getPosts(){
        const {collections} = this.props;
        let page_small_col = collections.find((element:any) => {
            return element.collection_name === 'posts_page_small';
        })
        return page_small_col && page_small_col ? page_small_col.posts : [];
    }


    render(){
        let posts = this.getPosts();
        console.log({posts});

        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm-12' style={{
                        height: "20vh",
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'rgba(0,0,0,.30)'
                    }}>
                        <h1>Current Posts!!</h1>
                    </div>
                </div>
                <div className='row'>
                    {
                        posts.map((element:IPostItem) => {
                            return (<div className='col-sm-4' key={element.id}>
                                <PostSmallItem post={element} collection={"posts_page_small"}/>
                            </div>)
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state:any) => {
    return {
        collections: JSON.parse(JSON.stringify(state.post.posts))
    }
}

export default connect(mapStateToProps)(PostsRoute);