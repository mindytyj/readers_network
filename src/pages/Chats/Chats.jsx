import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import ChatsAddButton from "./ChatsAddButton";
import ChatsListItem from "./ChatsListItem";
import AddChatModal from "./AddChatModal";

export default function Chats() {
  const user = useAtomValue(userAtom);
  const [chats, setChats] = useState([]);
  const [chatModal, setChatModal] = useState(false);

  useEffect(() => {
    async function getChats() {
      try {
        const userChats = await requestHandler(`/api/chats/${user?.id}`, "GET");

        setChats(userChats);
      } catch {
        console.error("Failed to retrieve chats.");
      }
    }
    getChats();
  }, []);

  return (
    <div className="card border-primary mb-3">
      <div className="card-header text-white bg-dark">My Chats</div>
      <div className="card-body">
        <div className="row mb-2">
          <div className="col">
            <h5>All Chats</h5>
          </div>
          <div className="col d-flex justify-content-md-end">
            <h5>
              <ChatsAddButton
                userId={user?.id}
                chatModal={chatModal}
                setChatModal={setChatModal}
              />
            </h5>
          </div>
        </div>
        <ol className="list-group list-group-numbered">
          {chats?.length > 0 ? (
            chats.map((chat) => {
              return (
                <div key={chat?.id}>
                  <ChatsListItem />
                </div>
              );
            })
          ) : (
            <div className="d-flex justify-content-center mt-2">
              <h6 className="">No chats available.</h6>
              <AddChatModal
                user={user}
                chatModal={chatModal}
                setChatModal={setChatModal}
              />
            </div>
          )}
        </ol>
      </div>
    </div>
  );
}
