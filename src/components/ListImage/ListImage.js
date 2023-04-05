import { Image } from "antd";
import React, { useState } from "react";

const ListImage = (props = []) => {
  const [visible, setVisible] = useState(false);
  const [displayImage, setDispalyImage] = useState(() => {
    try {
      return props.images[0];
    } catch (err) {
      return "";
    }
  });
  return (
    <>
      <Image
        preview={{
          visible: false,
        }}
        width={70}
        src={displayImage}
        onClick={() => setVisible(true)}
      />
      <div
        style={{
          display: "none",
        }}>
        <Image.PreviewGroup
          preview={{
            visible,
            onVisibleChange: (vis) => setVisible(vis),
          }}>
          {props.images.map((image, index) => {
            return <Image key={index} src={image}></Image>;
          })}
        </Image.PreviewGroup>
      </div>
    </>
  );
};

export default ListImage;
