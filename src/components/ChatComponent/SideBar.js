import React from "react";
// import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ConversationList,
  Avatar,
  Conversation,
} from "@chatscope/chat-ui-kit-react";

export default function SideBar() {
  return (
    <div
      style={{
        height: "460px",
      }}>
      <ConversationList>
        <Conversation
          name="Lilly"
          lastSenderName="Lilly"
          info="Yes i can do it for you">
          <Avatar src={require("./images/ram.png")} name="Lilly" />
        </Conversation>

        <Conversation
          name="Joe"
          lastSenderName="Joe"
          info="Yes i can do it for you">
          <Avatar src={require("./images/ram.png")} name="Joe" />
        </Conversation>

        <Conversation
          name="Emily"
          lastSenderName="Emily"
          info="Yes i can do it for you">
          <Avatar src={require("./images/ram.png")} name="Emily" />
        </Conversation>

        <Conversation
          name="Kai"
          lastSenderName="Kai"
          info="Yes i can do it for you">
          <Avatar src={require("./images/ram.png")} name="Kai" />
        </Conversation>

        <Conversation
          name="Akane"
          lastSenderName="Akane"
          info="Yes i can do it for you">
          <Avatar src={require("./images/ram.png")} name="Akane" />
        </Conversation>

        <Conversation
          name="Eliot"
          lastSenderName="Eliot"
          info="Yes i can do it for you">
          <Avatar src={require("./images/ram.png")} name="Eliot" />
        </Conversation>

        <Conversation
          name="Zoe"
          lastSenderName="Zoe"
          info="Yes i can do it for you">
          <Avatar src={require("./images/ram.png")} name="Zoe" />
        </Conversation>

        <Conversation
          name="Patrik"
          lastSenderName="Patrik"
          info="Yes i can do it for you">
          <Avatar src={require("./images/ram.png")} name="Patrik" />
        </Conversation>
      </ConversationList>
    </div>
  );
}
