import React from "react";
import "./custom-button.styles.scss"

const CustomButton = ({children, onclick, nextClass, ...OtherProps}) => {
    return (
        <button className={`custom-btn ${nextClass}`} onClick={onclick} {...OtherProps}>{children}</button>
    )
}

export default CustomButton;