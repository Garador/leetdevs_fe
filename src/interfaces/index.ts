export interface IMediaItem {
    id: string;
    url: string;
    alt: string;
}

export interface IPostItem {
    id: string;
    title: string;
    extract: string;
    text: string;
    slug: string;
    expires_at: number; //Milliseconds until it expires
    html_content: string;
    poster_image: IMediaItem;
    author_id: string;
}


export interface IPostCreationPayload {
    title: "",
    html_content: "",
    media: File
}