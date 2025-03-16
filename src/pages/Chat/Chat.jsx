import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router";
import { useAtomValue } from "jotai";
import { userAtom } from "../../handlers/userAtom";
import { useEffect, useState } from "react";
import ChatMessageItem from "./ChatMessageItem";
import requestHandler from "../../handlers/request-handler";

const socket = io.connect("http://localhost:3001");

export default function Chat() {
  const user = useAtomValue(userAtom);
  const { userId, friendId } = useParams();
  const [chatID, setChatID] = useState("");
  const [sentMessage, setSentMessage] = useState("");
  const [newMessage, setNewMessage] = useState({
    messageInput: "",
  });
  const [chatMessages, setChatMessages] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  if (!user || user.id !== parseInt(userId)) {
    navigate("/");
  }

  useEffect(() => {
    async function getChatIDAndPreviousMessages() {
      try {
        const chatId = await requestHandler(
          `/api/chats/chatID/${user?.id}/${friendId}`,
          "GET"
        );

        setChatID(chatId.id);

        const previousMessages = await requestHandler(
          `/api/chats/messages/${chatId.id}`,
          "GET"
        );

        setChatMessages(previousMessages);
      } catch (err) {
        console.log("Failed to retrieve previous messages.");
      }
    }
    getChatIDAndPreviousMessages();
  }, []);

  const joinChat = () => {
    if (chatID !== "") {
      socket.emit("joinChat", chatID);
    }
  };

  joinChat();

  const sendMessage = () => {
    setNewMessage({ messageInput: sentMessage });
    setSentMessage("");
  };

  useEffect(() => {
    if (newMessage.messageInput) {
      async function storeAndEmitMessage() {
        try {
          const messageData = { ...newMessage };
          await requestHandler(
            `/api/chats/add/${chatID}/${user?.id}/${friendId}`,
            "POST",
            {
              messageData,
            }
          );

          socket.emit("sendMessage", {
            chatID: chatID,
            message: newMessage.messageInput,
          });

          let date = new Date().toJSON();

          setChatMessages([
            ...chatMessages,
            {
              sent_recipient: user?.id,
              message: newMessage.messageInput,
              sent_date: date,
            },
          ]);
        } catch (err) {
          console.error("Unable to add message.");
        }
      }

      storeAndEmitMessage();
      setNewMessage({ messageInput: "" });
    }
  }, [newMessage]);

  function handleChange(evt) {
    setSentMessage(evt.target.value);

    if (evt.target.value != "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  return (
    <div className="container g-0 mt-4 mb-3 border border-primary border-opacity-50 rounded-bottom-1">
      <div className="list-group text-white bg-primary bg-opacity-75 mb-3 rounded-0">
        <div className="mt-4 mb-4 mx-3">
          <h4>Chat</h4>
        </div>
      </div>
      <div className="list-group">
        {chatMessages?.length > 0 ? (
          chatMessages.map((message) => {
            return (
              <div key={message?.id}>
                <ChatMessageItem user={user} message={message} />
              </div>
            );
          })
        ) : (
          <div className="d-flex justify-content-center mt-2 mb-3">
            <h6 className="">No messages available.</h6>
          </div>
        )}
        <div>
          <div className="mt-3 mb-3 mx-3 row d-flex justify-content-center">
            <div className="col-sm-10">
              <input
                className="form-control"
                type="text"
                id="messageInput"
                name="messageInput"
                placeholder="Message"
                value={sentMessage}
                onChange={handleChange}
              ></input>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-primary btn-sm"
                disabled={disabled}
                onClick={sendMessage}
              >
                <i className="bi bi-send-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
