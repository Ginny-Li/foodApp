import { useContext, useEffect, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  //利用 useContext 掛鉤並訂閱它以獲取最新的上下文數據時 當context出現變化時 物車按鈕組件將被重新評估 觸發更新
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  //reduce() 方法將一個累加器及陣列中每項元素（由左至右）傳入回呼函式，將陣列化為單一值
  //語法:array1.reduce((previousValue, currentValue) => previousValue + currentValue,initialValue);
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);


  //按鈕動畫 使用useeffect 讓購物車有更動會帶入動畫  useState控制btnClasses
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if(items.length === 0 ){
      return;
    }
    setBtnIsHighlighted(true);

    //移除css效果:bump
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    //效果重新運行時，我們清除計時器 讓他可以重新計時
    return () => {
      clearTimeout(timer);
    }

  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
