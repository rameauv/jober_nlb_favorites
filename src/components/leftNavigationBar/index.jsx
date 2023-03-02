import React from "react";
import { Menu } from "antd";
import MENUS from "./menus";
import "./index.css";

const LeftNavigationBar = () => {
  return (
    <div className="left-navigation-bar">
      <Menu defaultSelectedKeys={[MENUS[0].key]} mode="inline" theme="dark">
        {MENUS.map(({ key, label, icon }) => (
          <Menu.Item key={key} icon={icon}>
            {label}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default LeftNavigationBar;
