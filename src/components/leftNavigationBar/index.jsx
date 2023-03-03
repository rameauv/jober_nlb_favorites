import React from "react";
import {Menu} from "antd";
import MENUS from "./menus";
import styles from "./index.module.css"
import {StarOutlined, StarFilled} from "@ant-design/icons";

const LeftNavigationBar = () => {
  return (
      <div className={styles.leftBavigationBar}>
        <Menu
            className={styles.menu}
            defaultSelectedKeys={[MENUS[0].key]}
            mode="inline"
            theme="dark"
        >
          {MENUS.map(({key, label, icon}) => (
              <Menu.Item key={key} icon={icon}>
                <span>{label}</span>
                <StarOutlined/>
              </Menu.Item>
          ))}
        </Menu>
      </div>
  );
};

export default LeftNavigationBar;
