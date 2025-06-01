import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import dayjs from "dayjs";
import { Link, useParams } from "react-router";
import AddTopicPostComment from "./AddTopicPostComment";
import { useAtomValue } from "jotai";
import { userAtom } from "../../handlers/userAtom";

export default function TopicPostItem({ postId, setCommentUpdate }) {
  const [post, setPost] = useState([]);
  const user = useAtomValue(userAtom);
  const { groupId } = useParams();
  const [joinStatus, setJoinStatus] = useState([]);

  useEffect(() => {
    async function getPost() {
      try {
        const commentPost = await requestHandler(
          `/api/discussions/post/${postId}`,
          "GET"
        );
        setPost(commentPost);
      } catch (error) {
        console.error("Unable to get post.");
      }
    }
    getPost();
  }, []);

  useEffect(() => {
    async function getJoinStatus() {
      try {
        if (!user) {
          return;
        }

        const userJoinStatus = await requestHandler(
          `/api/groups/${groupId}/members/${user?.id}`,
          "GET"
        );

        if (userJoinStatus.length > 0) {
          setJoinStatus(userJoinStatus[0]);
        } else {
          setJoinStatus(0);
        }
      } catch (error) {
        console.error("Unable to get user's join status.");
      }
    }
    getJoinStatus();
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
                  <div>
                    <h5>{post.sub_topic_title}</h5>
                    <span className="small text-muted font-weight-normal mb-0">
                      {formatDate(post.created_date)}
                    </span>
                  </div>

                  <small>
                    by{" "}
                    <Link
                      className="text-decoration-none text-dark"
                      to={`/profile/${post.user_id}`}
                    >
                      <span className="fw-bold text-primary mb-1">
                        {post.first_name} {post.last_name}
                      </span>
                    </Link>
                  </small>
                </div>
              </div>
              <p className="mt-3 mb-4 pb-2">{post.sub_topic_description}</p>
            </div>
            {user && joinStatus?.user_id === user?.id ? (
              <div className="card-footer text-white fw-bold bg-primary bg-opacity-50 py-3 border-0">
                <AddTopicPostComment
                  postId={postId}
                  setCommentUpdate={setCommentUpdate}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
