import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IPostItem } from '../../../interfaces'
import { FirebaseManager } from '../../../manager/Firebase'
import { PostManager } from '../../../manager/Post'
import { setCollection, setPost } from '../../../reducers/Post'
import { setUser } from '../../../reducers/User'


export function LoaderComponent(props:any){
    const dispatch = useDispatch()

    React.useEffect(()=>{
        Promise.all([
            FirebaseManager.initialize({
                redux_setUser: (user:any) => {
                    dispatch(setUser(user))
                }
            }),
            PostManager.initialize({
                setPostExpiryDate: (data:{record:IPostItem, collection:string}) => {
                    dispatch(setPost({
                        collection: data.collection,
                        data: data.record
                    }))
                },
                setCollection: (data:{records:IPostItem[], collection:string}) => {
                    dispatch(setCollection({
                        collection: data.collection,
                        data: data.records
                    }))
                },
                setPost: (data:{record:IPostItem, collection:string}) => {
                    dispatch(setPost({
                        collection: data.collection,
                        data: data.record
                    }))
                }
            })
          ])
          .then(function(){
            console.log("Successfully initialized Firebase.");
          })
    }, [])

    const contextUser = useSelector((state:any) => {
        return state.user.user;
    });

    const collections =  useSelector((state:any) => {
        return state.post.posts;
    });

    return (
        contextUser ? {...props.children, collections} : <div style={{
            color: 'black',
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            display: "flex",
            fontSize: "5em"
        }}>Loading...</div>
    )
}