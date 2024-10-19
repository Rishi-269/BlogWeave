import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-color5",
    textColor = "text-color2",
    bgHoverColor = "hover:bg-color4",
    className = "",
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg font-bold ${bgColor} ${bgHoverColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}