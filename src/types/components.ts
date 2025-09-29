import { FormItemProps } from "antd";
import type { CardProps as AntCardProps } from "antd/es/card";
import type { ModalProps as AntModalProps } from "antd/es/modal";

export interface CommonCardProps extends AntCardProps {
    children: React.ReactNode;
    hoverable?: boolean;
    bordered?: boolean;
    shadow?: "always" | "hover" | "never";
}

export interface CommonModalProps extends AntModalProps {
    children: React.ReactNode;
}

export interface CommonButtonProps {
    variant?: "primary" | "outlined";
    color?: string;
    size?: "large" | "middle" | "small";
    block?: boolean;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    htmlType?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
}
export interface BouncingDotsProps {
    color?: string;
}

export interface CommonInputProps extends FormItemProps {
    type?: "text" | "number" | "password";
    icon?: React.ReactNode;
    iconPosition?: "left" | "right" | "none";
    placeholder?: string;
    size?: "large" | "middle" | "small";
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    autoComplete?: string;
}

export const restrictNumberInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Only allow digits and navigation keys
    if (!/[0-9]/.test(e.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) {
        e.preventDefault();
    }
};