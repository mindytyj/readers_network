import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import dayjs from "dayjs";
import { Link } from "react-router";
import AddComment from "./AddComment";

export default function PostListItem({ postId, setCommentUpdate }) {
  const [post, setPost] = useState([]);

  useEffect(() => {
    async function getPost() {
      try {
        const commentPost = await requestHandler(
          `/api/feed/post/${postId}`,
          "GET"
        );
        setPost(commentPost);
      } catch (error) {
        console.error("Unable to get post.");
      }
    }
    getPost();
  }, []);

  function formatDate(date) {
    return dayjs(date).format("DD MMMM YYYY hh:mm A");
  }

  return (
    <section>
      <div className="row d-flex justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-start align-items-center">
                <div>
                  <Link
                    className="text-decoration-none text-dark"
                    to={`/profile/${post.user_id}`}
                  >
                    <h6 className="fw-bold text-primary mb-1">
                      {post.first_name} {post.last_name}
                    </h6>
                  </Link>
                  <span className="small text-muted font-weight-normal mb-0">
                    {formatDate(post.created_date)}
                  </span>
                </div>
              </div>
              <p className="mt-3 mb-4 pb-2">{post.post}</p>
            </div>
            <div className="card-footer text-white fw-bold bg-primary bg-opacity-50 py-3 border-0">
              <div>
                <AddComment
                  postId={postId}
                  setCommentUpdate={setCommentUpdate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
