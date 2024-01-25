import { Params, useLoaderData } from "react-router-dom";

import PostItem from "../components/PostItem";

export interface Post {
  id: number;
  title: string;
  body: string;
}

function PostPage() {
  const post = useLoaderData() as Post;

  return <PostItem post={post} />;
}

export default PostPage;

export function loader({ params }: { params: Params }) {
  const postId = params.id;
  return fetch("https://jsonplaceholder.typicode.com/posts/" + postId);
}
