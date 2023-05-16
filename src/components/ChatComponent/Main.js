import React, { useState, useEffect, useContext } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  Avatar,
  ChatContainer,
  ConversationHeader,
  VoiceCallButton,
  Message,
  MessageInput,
  VideoCallButton,
  InfoButton,
  MessageSeparator,
  TypingIndicator,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import useHttpClient from "../../hooks/useHttpClient";
import { AuthContext } from "../../context/auth";
import moment from "moment/moment";
import { SocketContext } from "../../context/socket";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

export default function Main() {
  // Set initial message input value to empty string
  const [messageInputValue, setMessageInputValue] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { sendReq, isLoading } = useHttpClient();
  const [loadedRooms, setLoadedRooms] = useState([]);
  const [loadedMessages, setLoadedMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({ members: [] });
  const [reload, setReload] = useState(false);
  const [userIndexInMembers, setUserIndexInMembers] = useState("1");
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/rooms/${currentUser.userId}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${currentUser.token}`,
          }
        );

        setLoadedRooms(responseData.rooms);
        setCurrentRoom(responseData.rooms[0]);
      } catch (err) {}
    };
    fetchPosts();
  }, [sendReq, currentUser.userId]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/messages/${currentRoom.id}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${currentUser.token}`,
          }
        );
        setLoadedMessages(responseData.messages);
      } catch (err) {}
    };
    if (currentRoom.id) {
      fetchMessages();
    }
  }, [sendReq, currentRoom.id, reload]);

  const handleSendMessage = async () => {
    const reqData = {
      text: messageInputValue,
      sender: currentUser.userId,
      roomId: currentRoom.id,
    };
    setMessageInputValue("");
    try {
      let reqURL =
        currentRoom.members[userIndexInMembers]?.id ===
        "646320b2e2dbf52fcc3ba8d9"
          ? `${process.env.REACT_APP_BASE_URL}/messages/gpt`
          : `${process.env.REACT_APP_BASE_URL}/messages`;
      await sendReq(reqURL, "POST", JSON.stringify(reqData), {
        Authorization: `Bearer ${currentUser.token}`,
        "Content-Type": "application/json",
      });
      if (
        currentRoom.members[userIndexInMembers]?.id ===
        "646320b2e2dbf52fcc3ba8d9"
      ) {
        setReload(!reload);
      }

      if (socket.current) {
        socket.current.emit("chat", {
          sender: currentUser,
          roomId: currentRoom.id,
          text: messageInputValue,
        });
      }
    } catch (err) {}
  };
  // console.log(loadedMessages);
  useEffect(() => {
    socket.current.on("chatReceived", (data) => {
      // console.log(loadedMessages);
      setLoadedMessages((prev) => {
        return [
          ...prev,
          {
            sender: data.sender,
            roomId: data.roomId,
            text: data.text,
          },
        ];
      });
      // setReload(!reload);
    });
  }, [
    socket.current,
    // , reload
  ]);

  console.log(loadedMessages);

  return (
    <div
      className="chat-container"
      style={{
        height: "90vh",
        position: "relative",
        fontSize: "30px",
        width: "100%",
        position: "relative",
      }}>
      {isLoading && (
        <div
          className="loading-chatgpt"
          style={{
            position: "absolute",
            top: "88%",
            left: "60%",
            zIndex: "10",
          }}>
          <LoadingIcon />
        </div>
      )}
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          {/* <Search placeholder="Search..." /> */}
          <ConversationList>
            {loadedRooms.map((room) => {
              return (
                <Conversation
                  onClick={() => {
                    setCurrentRoom(room);
                    setUserIndexInMembers(() => {
                      return room.members[0].id == currentUser.userId
                        ? "1"
                        : "0";
                    });
                    setReload(!reload);
                  }}
                  name={
                    room.members[
                      room.members[0].id == currentUser.userId ? "1" : "0"
                    ]?.name
                  }
                  // lastSenderName="Lilly"
                  // info="Yes i can do it for you"
                >
                  <Avatar
                    src={
                      room.members[
                        room.members[0].id == currentUser.userId ? "1" : "0"
                      ]?.avatar
                    }
                    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReiyHYtDJQ0t5jCs4j_PiD5ESMvPwnvHVa3w&usqp=CAU"
                    name="Lilly"
                  />
                </Conversation>
              );
            })}
          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar
              src={currentRoom.members[userIndexInMembers]?.avatar}
              name={currentRoom.members[userIndexInMembers]?.name}
            />
            <ConversationHeader.Content
              userName={currentRoom.members[userIndexInMembers]?.name}
              // info="Active 10 mins ago"
            />
            <ConversationHeader.Actions>
              {/* <VoiceCallButton />
              <VideoCallButton />
              <InfoButton /> */}
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList
          // typingIndicator={<TypingIndicator content="Zoe is typing" />}
          >
            {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}
            {loadedMessages.map((mess) => {
              return (
                <Message
                  model={{
                    message: `${mess.text}`,
                    // sentTime: "15 mins ago",
                    sender: `${mess.sender.name}`,
                    direction:
                      mess.sender.id == currentUser.userId ||
                      mess.sender.userId == currentUser.userId
                        ? "outgoing"
                        : "incoming",
                    position: "single",
                  }}>
                  <Message.Header
                    sender={mess.sender.name}
                    // sentTime={mess.date}
                    sentTime={moment(mess.date).fromNow()}
                    // sentTime={moment(mess.date).format("YYYY-MM-DD HH:mm:ss")}
                  />

                  <Avatar src={mess.sender.avatar} name="Zoe" />
                </Message>
              );
            })}
          </MessageList>
          <LoadingIcon />
          <MessageInput
            placeholder="Type message here"
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={handleSendMessage}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
