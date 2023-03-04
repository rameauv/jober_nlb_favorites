import React, {useMemo, useState} from "react";
import {Menu} from "antd";
import MENUS from "./menus";
import styles from "./index.module.css"
import {StarOutlined, StarFilled} from "@ant-design/icons";

function useMenuItemsElements(menuItems, favoritedItems, addToFavorites) {
  return useMemo(() => {
    return menuItems.map(({key, label, icon}) => {
      const isFavorited = favoritedItems.find(favoritedItem => favoritedItem.key === key) === undefined;

      return (
          <Menu.Item key={key} icon={icon}>
            <span>{label}</span>
            {
                isFavorited &&
                <StarOutlined
                    className={styles.starIcon}
                    onClick={() => addToFavorites(key)}
                    data-cy="add-to-favorites-button"
                />
            }
          </Menu.Item>
      )
    })
  }, [menuItems, favoritedItems, addToFavorites])
}

function useFavoritedMenuItemsElements(favoritedItems, removeFromFavorites) {
  return useMemo(() => {
    return favoritedItems.map(({key, label, icon}) => (
        <Menu.Item key={`favorited-${key}`} icon={icon}>
          <span>{label}</span>
          <StarFilled
              className={styles.starIcon}
              onClick={() => removeFromFavorites(key)}
              data-cy="remove-from-favorites-button"
          />
        </Menu.Item>
    ));
  }, [favoritedItems, removeFromFavorites]);
}

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

  const favoritedMenuItemsEmlements = useFavoritedMenuItemsElements(favoritedItems, removeFromFavorites);
  const menuItemsElements = useMenuItemsElements(MENUS, favoritedItems, addToFavorites);

  return (
      <div className={styles.leftBavigationBar}>
        <Menu
            className={styles.menu}
            defaultSelectedKeys={[MENUS[0].key]}
            mode="inline"
            theme="dark"
        >
          {favoritedMenuItemsEmlements}
          {favoritedItems.length && <Menu.Divider/>}
          {menuItemsElements}
        </Menu>
      </div>
  );
};

export default LeftNavigationBar;
