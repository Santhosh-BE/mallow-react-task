import { BouncingDotsProps } from "../types";

export const createAction = (module: string) => ({
    REQUEST: `${module}_REQUEST`,
    LOADING: `${module}_LOADING`,
    SUCCESS: `${module}_SUCCESS`,
    ERROR: `${module}_ERROR`,
    RESET: `${module}_RESET`,
});

export const getButtonStyle = (variant: string, color: string, disabled: boolean) => {
    if (variant === "outlined") {
        return {
            background: "#fff",
            borderColor: "#C2C0C0",
            color: disabled ? "rgba(33,150,243,0.5)" : color || "#2196f3",
        };
    }
    return {
        background: disabled ? "rgba(33,150,243,0.5)" : color || "#2196f3",
        borderColor: disabled ? "rgba(33,150,243,0.5)" : color || "#2196f3",
        color: "#fff",
    };
};

export const BouncingDots: React.FC<BouncingDotsProps> = ({ color = "#fff" }) => (
    <span
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0,
        }}
    >
        <span className="bouncing-dot" style={{ animation: "bounce 1s infinite", marginRight: 4, color }}>
            .
        </span>
        <span className="bouncing-dot" style={{ animation: "bounce 1s infinite 0.2s", marginRight: 4, color }}>
            .
        </span>
        <span className="bouncing-dot" style={{ animation: "bounce 1s infinite 0.4s", color }}>
            .
        </span>
        <style>
            {`
            @keyframes bounce {
                0%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-12px); }
            }
            .bouncing-dot {
                font-size: 2.8em;
                display: inline-block;
            }
            `}
        </style>
    </span>
);
