import { useContext } from "react";

import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css";
import CartContext from "../../../store/cart-context";

//ul > li 的樣式 有price id 傳進來的amount 使用context
const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`; //傳入的價格加上$字號到小數點第二位

  const addToCArtHandle = (amount) => {
    //觸發  const addItemToCartHandler = (item) => {dispatchCartAction({ type: "ADD", item: item });};
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCArtHandle} />
      </div>
    </li>
  );
};

export default MealItem;
