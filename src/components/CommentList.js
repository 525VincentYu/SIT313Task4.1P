import { Comment } from './Comment';

export function CommentList({ comments }) {
  //get comment
  console.log('commm' + comments);
  return comments.map((comment) => (
    <div key={comment.id} className='comment-stack'>
      <Comment {...comment} />
    </div>
  ));
}
