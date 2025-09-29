import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../constants/Common";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#f0f2f5" }}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button type="primary" onClick={() => navigate(ROUTE.USERS)}>
                        Back Home
                    </Button>
                }
            />
        </div>
    );
};

export default NotFound;
