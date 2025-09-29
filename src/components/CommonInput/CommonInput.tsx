import React from "react";
import { Input } from "antd";
import { Form } from "antd";
import { CommonInputProps, restrictNumberInput } from "../../types";

const CommonInput: React.FC<CommonInputProps> = ({
    type = "text",
    icon,
    iconPosition = "left",
    placeholder,
    size = "large",
    value,
    onChange,
    disabled,
    autoComplete,
    name,
    rules,
    ...formItemProps
}) => {
    const inputProps = {
        type,
        placeholder,
        value,
        onChange,
        disabled,
        autoComplete,
    };
    const additionalProps: { onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void } = {};
    if (type === "number") {
        additionalProps.onKeyDown = restrictNumberInput;
    }
    let prefix: React.ReactNode = undefined;
    let suffix: React.ReactNode = undefined;
    if (icon && iconPosition === "left") prefix = icon;
    if (icon && iconPosition === "right") suffix = icon;

    return (
        <Form.Item name={name} rules={rules} {...formItemProps}>
            {type === "password" ? (
                <Input.Password prefix={prefix} suffix={suffix} {...inputProps} {...additionalProps} size={size} />
            ) : (
                <Input prefix={prefix} suffix={suffix} {...inputProps} {...additionalProps} size={size} />
            )}
        </Form.Item>
    );
};

export default CommonInput;
