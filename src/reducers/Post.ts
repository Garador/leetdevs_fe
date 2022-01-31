import { createSlice } from '@reduxjs/toolkit'
import { IPostItem } from '../interfaces'

interface IPostCollections {
    collection_name: string
    posts: IPostItem[]
}

export const postSlice = createSlice({
    name: 'post_slice',
    initialState: {
        posts: [],
    },
    reducers: {
        setPost: (state: {
            posts: IPostCollections[]
        }, action: {
            payload: {
                collection: string,
                data: IPostItem
            }
        }) => {
            const { collection, data } = action.payload;
            state.posts = state.posts.map((storedCollection:any) => {
                if(storedCollection && (storedCollection.collection_name == collection)){
                    storedCollection.posts = storedCollection.posts.map((element2:any) => {
                        if(element2.id === data.id){
                            return data;
                        }
                        return element2;
                    })
                }
                return storedCollection;
            });
        },
        setCollection: (state: {
            posts: IPostCollections[]
        }, action: {
            payload: {
                collection: string,
                data: IPostItem[]
            }
        }) => {
            let found_collection = state.posts.find(element => {
                return (element.collection_name === action.payload.collection)
            })
            if(found_collection){
                found_collection.posts = action.payload.data;
                state.posts = state.posts.map(element => {
                    if(element.collection_name === found_collection?.collection_name){
                        return found_collection
                    }
                    return element;
                })
            }else{
                found_collection = {
                    collection_name: action.payload.collection,
                    posts: action.payload.data
                }
                state.posts.push(found_collection);
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { setPost, setCollection } = postSlice.actions

export default postSlice.reducer
