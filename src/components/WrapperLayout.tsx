import { useEffect } from "react";
import { Outlet } from "react-router";
const WrapperLayout = () => {
   
    return (
        <div className="client-style">
            <Outlet />
        </div>
    );
};

export default WrapperLayout;
