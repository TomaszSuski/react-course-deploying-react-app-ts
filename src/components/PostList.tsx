import { Link } from 'react-router-dom';

import classes from './PostList.module.css';
import { Post } from '../pages/Post';

export interface PostListProps {
  posts: Post[];
}

function PostList({ posts }: PostListProps) {
  return (
    <ul className={classes.list}>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={post.id.toString()}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
