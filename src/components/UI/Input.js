import React from "react";
import classes from "./Input.module.css";

//在自訂組件使用useRef 用 React.forwardRef 包裝你的組件函數
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* props傳入的input是物件 這邊讓他自動展開 */}
      {/* 可以設置 ref 道具轉發參考 */}
      <input ref={ref} {...props.input} />
    </div>
  );
});
export default Input;
