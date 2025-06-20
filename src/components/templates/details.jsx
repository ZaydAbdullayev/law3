import { useState } from "react";
import "../index.scss";
import { comments, laws_data } from "../../context/data";
import { useNavigate, useParams } from "react-router-dom";

const getRandomComents = (commentCount) => {
  const randomComments = [];
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * comments.length);
    const comment = comments[randomIndex];
    randomComments.push({
      id: Date.now() + i,
      user: comment.user,
      avatar: comment.avatar,
      text: comment.text,
      time: comment.time,
    });
  }
  return randomComments.slice(0, commentCount);
};

export const LawDetail = () => {
  const { id } = useParams();
  const law = laws_data.find((law) => law.id === parseInt(id));
  const [votes, setVotes] = useState({ yes: law.upvotes, no: law.downvotes });
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(getRandomComents(law.comments));
  const navigate = useNavigate();

  const handleVote = (type) => {
    setVotes({ ...votes, [type]: votes[type] + 1 });
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    const newComment = {
      id: Date.now(),
      user: "You",
      avatar: "https://i.pravatar.cc/40?img=1",
      text: comment,
      time: "just now",
    };
    setComments([newComment, ...comments]);
    setComment("");
  };

  return (
    <div className="law-detail-page">
      <div className="container">
        <span className="backword" onClick={() => navigate("/")}>
          Go Back
        </span>
        <h1 className="w100 df jcsb">
          {law.title}{" "}
          <small className="fs-12">
            <strong>Votes:</strong> {votes.yes} Yes / {votes.no} No
          </small>
        </h1>
        <div className="category">{law.category}</div>
        <p className="description">{law.description}</p>

        <div className="df fdc gap-15">
          <small>Use the buttons below to vote on this proposal.</small>
          <div className="vote-buttons">
            <button onClick={() => handleVote("yes")}>YES</button>
            <button onClick={() => handleVote("no")}>NO</button>
          </div>
        </div>

        <div className="df fdc gap-10">
          <p className="fs-18">Write your own comment</p>
          <div className="comment-input">
            <input
              type="text"
              placeholder="Add your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={handleAddComment}>Post</button>
          </div>
        </div>

        <h3>{law.comments} Comments</h3>

        <div className="comment-list">
          {comments.map((c) => (
            <div className="comment" key={c.id}>
              <img src={c.avatar} alt={c.user} />
              <div>
                <strong>{c.user}</strong> <span>{c.time}</span>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
          <div className="w100 df aic jcc cp">
            <u>See more</u>
          </div>
        </div>
      </div>
    </div>
  );
};
