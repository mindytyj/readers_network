import { socket } from "../../socket";
import { useNavigate, useParams } from "react-router";
import { useAtomValue } from "jotai";
import { userAtom } from "../../handlers/userAtom";
import { useEffect, useRef, useState } from "react";
import ChatMessageItem from "./ChatMessageItem";
import requestHandler from "../../handlers/request-handler";
import ChatHeader from "./ChatHeader";
import ScrollToLatestMessage from "./ScrollToLatestMessage";

export default function Chat() {
  const user = useAtomValue(userAtom);
  const { userId, friendId } = useParams();
  const [chatID, setChatID] = useState("");
  const [recipient, setRecipient] = useState([]);
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

        const recipientInfo = await requestHandler(
          `/api/chats/recipient/${chatId.id}/${user?.id}`,
          "GET"
        );

        setRecipient(recipientInfo);

        const previousMessages = await requestHandler(
          `/api/chats/messages/${chatId.id}`,
          "GET"
        );

        setChatMessages(previousMessages);

        const messagesContainer = document.getElementById("messagesContainer");

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      } catch (err) {
        console.log("Failed to retrieve chat details and messages.");
      }
    }

    getChatIDAndPreviousMessages();
  }, []);

  useEffect(() => {
    if (chatID) {
      socket.emit("joinChat", chatID);
    }
  }, [chatID]);

  useEffect(() => {
    socket.on("sendMessage", (message) => {
      setChatMessages((chatMessages) => [...chatMessages, message]);
    });

    return () => {
      socket.off("sendMessage");
    };
  }, []);

  function sendMessage() {
    setNewMessage({ messageInput: sentMessage });
    setSentMessage("");
  }

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

          let date = new Date().toISOString();

          socket.emit("sendMessage", {
            chatID: chatID,
            id: chatMessages.length + 1,
            sent_recipient: user?.id,
            message: newMessage.messageInput,
            sent_date: date,
          });
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

    if (evt.target.value !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  return (
    <div className="container g-0 mt-4 mb-3 border border-primary border-opacity-50 rounded-bottom-1">
      <ChatHeader recipient={recipient} />
      <div className="container">
        <div
          id="messagesContainer"
          className="overflow-y-auto messagesContainer"
        >
          {chatMessages?.length > 0 ? (
            chatMessages.map((message) => {
              return (
                <div
                  className={
                    "d-flex " +
                    (message.sent_recipient === user?.id
                      ? "justify-content-end"
                      : "justify-content-start")
                  }
                  key={message?.id}
                >
                  <ChatMessageItem
                    userId={user?.id}
                    recipient={recipient}
                    message={message}
                  />
                </div>
              );
            })
          ) : (
            <div className="d-flex justify-content-center mt-2 mb-3">
              <h6 className="">No messages available.</h6>
            </div>
          )}
          <ScrollToLatestMessage />
        </div>
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
  );
}
