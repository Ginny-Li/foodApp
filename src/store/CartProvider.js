import { useReducer } from "react";
import CartContext from "./cart-context";

//Provider是真正工作的地方 搭配useReducer管理狀態

//cart預設值 在 cartReducer 中返回
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //MealItemForm 送出 會傳送price、amount
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    //findIndex() 尋找陣列中符合的元素，並返回其 index（索引） 沒有符合的對象返回 -1
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    //獲取要添加的項目: 假如添加壽司 壽司已經在陣列了 從上面找到壽司index 這邊就知道這個索引位置是壽司 如果上面沒找到索引這裡則為空
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    //合併購物車相同項目
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        //合併的數字更新原來的 + 新增的
        amount: existingCartItem.amount + action.item.amount,
      };
      //更新購物車項目 : 物件展開語法新陣列 再利用updatedItem覆蓋 去更新舊有項目的 amount;
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      //首次添加項目
      //concat() 方法被用來合併兩個或多個陣列 完成不會改變現有的陣列，回傳一個新陣列。
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      //cartCtx.removeItem(id)
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];

    //調整減少金額
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;

    //調整list
    if (existingItem.amount === 1) {
      //扣除後整個項目被刪除
      //filter() 方法會建立一個經指定之函式運算後，由原陣列中通過該函式檢驗之元素所構成的新陣列
      //id 不等於 action id 的地方會被保留(沒有被刪除的部分) id 等於 action id的項目被刪除
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      //扣除後項目還在 更新項目的數目 更新過後的項目updatedItem 覆蓋舊的項目
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  //第一個參數:狀態快照 第二參數:函數 將操作分派給減速器
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  //使用 Provider 包裝的組件能夠訪問上下文並訂閱它並監聽上下文值的變化 使用 value 屬性公開它們
  //當我們在設置consumer時，使用 Provider 包裝的任何組件都能夠訪問這些上下文方法  useContext去做這件事
  //props.children 是 Provider 的開始標籤和結束標籤之間的任何內容
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
