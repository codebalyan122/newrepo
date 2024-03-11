import React from "react";
import { Card, Space } from "antd";
import { useNavigate } from "react-router-dom";

const CardComponent = ({ text, navigateLink }) => {
  const navigate = useNavigate();
  return (
    <Space direction="vertical" size={16}>
      <Card
        style={{
          width: 350,
          marginTop: "3rem",
          marginLeft: "1rem",
          cursor: "pointer",
          fontSize: "1.4rem",
          color: "blue",
        }}
        className="text-center shadow-gray-400 bg-white"
        onClick={() => navigate(navigateLink)}
      >
        {/* <Link
          to="/admin/tour-category/top"
          className="text-xl font-bold no-underline"
        > */}
        {text}
        {/* </Link> */}
      </Card>
    </Space>
  );
};

export default CardComponent;
