import { Navigate, Outlet } from "react-router-dom";
import jsCookie from "js-cookie";

const ProtectedRoute = props => {
    const jwtToken = jsCookie.get('jwt_token')

    if (jwtToken === undefined) {
        return <Navigate to="/login" />
    }

    return (
        <Outlet />
    )
}

export default ProtectedRoute