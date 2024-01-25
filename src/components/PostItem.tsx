import { Post } from '../pages/Post';
import classes from './PostItem.module.css';

export interface PostItemProps {
  post: Post;
}

function PostItem({ post }: PostItemProps) {
  return (
    <article className={classes.item}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}

export default PostItem;
