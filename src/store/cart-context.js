import React from "react";

//使用Contex 管理Cart的全部data:MealItem  Cart Header的總項目 彈窗totalAmount
//設置默認值createContext() 建議但並不是必需 默認值有助於隔離測試組件
// 組件在DOM中沒有匹配的 Provider時才使用該defaultValue參數
const CartContext= React.createContext({
    items: [],
    totalAmount:0, 
    addItem:(item) =>{},
    removeItem:(id) =>{}
});

export default CartContext;