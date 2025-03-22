import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import MessageFriendListItem from "./ChatsFriendListItem";

export default function AddChatModal({ user, chatModal, setChatModal }) {
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    async function getFriends() {
      try {
        const friends = await requestHandler(
          `/api/users/${user?.id}/friends`,
          "GET"
        );

        setFriendList(friends);
      } catch {
        console.error("Failed to retrieve friend list.");
      }
    }
    getFriends();
  }, []);

  const showChatModal = () => {
    setChatModal(!chatModal);
  };

  return (
    <div
      className="modal"
      data-bs-backdrop="static"
      tabIndex="-1"
      style={{ display: chatModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content border-primary">
          <div className="modal-header text-white bg-dark" data-bs-theme="dark">
            <h5 className="modal-title">New Chat</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={showChatModal}
            ></button>
          </div>
          <div className="modal-body">
            <ol className="list-group list-group-numbered">
              {friendList?.length >= 0 ? (
                friendList.map((friend) => {
                  return (
                    <div key={friend?.friend_id}>
                      <MessageFriendListItem user={user} friend={friend} />
                    </div>
                  );
                })
              ) : (
                <div className="d-flex justify-content-center mt-2">
                  <h6 className="">No friends added.</h6>
                </div>
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
