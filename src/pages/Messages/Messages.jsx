import { useAtomValue } from "jotai";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import MessageListItem from "./MessageListItem";

export default function Messages() {
  const user = useAtomValue(userAtom);
  const socket = io.connect("http://localhost:3001");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getMessages() {
      try {
        const userMessages = await requestHandler(
          `/api/messages/${user?.id}`,
          "GET"
        );

        setMessages(userMessages);
      } catch {
        console.error("Failed to retrieve messages.");
      }
    }
    getMessages();
  }, []);

  return (
    <div className="card border-primary mb-3">
      <div className="card-header text-white bg-dark">My Messages</div>
      <div className="card-body">
        <ol className="list-group list-group-numbered">
          {messages?.length > 0 ? (
            messages.map((message) => {
              return (
                <div key={message?.id}>
                  <MessageListItem />
                </div>
              );
            })
          ) : (
            <div className="d-flex justify-content-center mt-2">
              <h6 className="">No messages available.</h6>
            </div>
          )}
        </ol>
      </div>
    </div>
  );
}
