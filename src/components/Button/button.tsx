import React from "react";
import styles from "./button.module.css"

interface ButtonProps {
    text: string; // text for the button
    onClick?: () => void; // optional 
}

const Button: React.FC<ButtonProps> = ({text, onClick}) => {
    return (
        <button className={styles.button}>
            {text}
        </button>
    )
}

export default Button;