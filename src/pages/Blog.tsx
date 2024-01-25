import { useLoaderData } from 'react-router-dom';

import PostList from '../components/PostList';
import { Post } from './Post';

function BlogPage() {
  const posts = useLoaderData() as Post[];
  return <PostList posts={posts} />;
}

export default BlogPage;

export function loader() {
  return fetch('https://jsonplaceholder.typicode.com/posts');
}
