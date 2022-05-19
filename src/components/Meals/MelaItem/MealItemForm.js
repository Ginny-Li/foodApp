import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

//讓商品可以加入購物車
const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  //送出之後取得amount 
  const submitHandler = (event) => {
    event.preventDefault(); 

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount; //+ 讓字串轉數字

    //驗證input輸入的值
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    //因為這裡只有 數量 所以不用context 使用props傳遞給 MealItem(有price)
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {/* 自訂組件設定useRef 取得input的值 回到Input.js 使用React.forwardRef */}
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};
export default MealItemForm;
