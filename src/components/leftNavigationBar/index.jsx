import React, {useMemo, useState} from "react";
import {Menu} from "antd";
import MENUS from "./menus";
import styles from "./index.module.css"
import {StarOutlined, StarFilled} from "@ant-design/icons";

const LeftNavigationBar = () => {
  const menuDictionary = useMemo(() => {
    return new Map(
        MENUS.map(item => ([
          item.key,
          item
        ]))
    )
  }, [MENUS]);
  const [favoritedItems, setFavoritedItems] = useState([]);

  function addToFavorites(key) {
    setFavoritedItems(currentFavoritedItems => {
      console.log(menuDictionary);
      const item = menuDictionary.get(key);
      if (item === undefined) {
        console.error(`could not find the menu item associated with the key:${key}`); // log the error on a crash reporting service
      }
      return [...currentFavoritedItems, item];
    });
  }

  function removeFromFavorites(key) {
    setFavoritedItems(currentFavoritedItems => {
      const newItems = currentFavoritedItems
          .filter(item => item.key !== key);

      return newItems;
    });
  }

  return (
      <div className={styles.leftBavigationBar}>
        <Menu
            className={styles.menu}
            defaultSelectedKeys={[MENUS[0].key]}
            mode="inline"
            theme="dark"
        >
          {favoritedItems.map(({key, label, icon}) => (
              <Menu.Item key={`liked-${key}`} icon={icon}>
                <span>{label}</span>
                <StarFilled onClick={() => removeFromFavorites(key)}/>
              </Menu.Item>
          ))}
          {favoritedItems.length && <Menu.Divider/>}
          {MENUS.map(({key, label, icon}) => (
              <Menu.Item key={key} icon={icon}>
                <span>{label}</span>
                {
                    favoritedItems.find(favoritedItem => favoritedItem.key === key) === undefined &&
                    <StarOutlined
                        onClick={() => addToFavorites(key)}
                    />
                }
              </Menu.Item>
          ))}
        </Menu>
      </div>
  );
};

export default LeftNavigationBar;
