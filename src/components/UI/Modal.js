import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

//通過React Portal在 DOM 樹中的特定位置(root的上面) 渲染實際的HTML元素
const Backdrop = (props) => {
  //從App.js轉發道具 onClose到 Modal 點擊黑色背景就可以關掉Cart
  //通過多個級別的功能在 Modal 上，我們也可以添加 onClose 屬性  Modal 更可重用
  //使用Context 綁定特定一個 Click 關閉購物車的背景 Modal無法再次被使用
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

//將 Modal 作為包裝元素<Modal> </Modal>之間傳遞了一些 JSX 代碼 :children 屬性傳遞給 Modal 組件的內容
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

//傳送到哪個位置
const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
