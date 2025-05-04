import React from "react";
import styles from "./button.module.css"

interface ButtonProps {
    text: string; // text for the button
    onClick?: () => void; // optional 
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({text, onClick, type}) => {
    return (
        <button
            type={type}
            onClick={onClick} 
            className={styles.button}
        >
            {text}
        </button>
    )
}

export default Button;