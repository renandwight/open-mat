
function ReviewCard({ reviewData }) {
  const { rating, comment, created_at, user } = reviewData;

  return (
    <div>
      <ul>
        {user && <li>Reviewer: {user.username}</li>}
        <li>Rating: {rating}</li>
        <li>Comment: {comment}</li>
        <li>Created: {created_at}</li>
      </ul>
    </div>
  );
}

export default ReviewCard;