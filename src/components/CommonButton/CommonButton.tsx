import React from "react";
import { Button } from "antd";
import { CommonButtonProps } from "../../types";
import { BouncingDots, getButtonStyle } from "../../helpers";

const CommonButton: React.FC<CommonButtonProps> = ({
    variant = "primary",
    color = "#2196f3",
    size = "large",
    block = false,
    style,
    children,
    htmlType = "button",
    onClick,
    disabled,
    loading = false,
}) => {
    const isDisabled = disabled || loading;
    const buttonStyle = { ...getButtonStyle(variant, color, isDisabled), ...style };
    const loaderDotColor = variant === "outlined" ? (isDisabled ? "rgba(33,150,243,0.5)" : color || "#2196f3") : "#fff";
    return (
        <Button
            type={variant === "primary" ? "primary" : "default"}
            size={size}
            block={block}
            style={{ ...buttonStyle, position: loading ? "relative" : undefined }}
            htmlType={htmlType}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? <BouncingDots color={loaderDotColor} /> : children}
        </Button>
    );
};

export default CommonButton;
