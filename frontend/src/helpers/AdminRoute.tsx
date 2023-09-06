import { useReactKeycloackId } from "react-keycloak-id";
import { Navigate } from 'react-router-dom';
import { KEYCLOAK_CLIENT } from "../constant";

interface Props {
    children: JSX.Element,
}

export default function AdminRoute ({children}:Props) {
 const { authenticated,tokenParsed } = useReactKeycloackId();
 const user_role:any = tokenParsed?.resource_access;
 const roles = user_role[KEYCLOAK_CLIENT]?user_role[KEYCLOAK_CLIENT].roles:[];

 const isLoggedIn = authenticated;
 

 return roles.includes('admin') && isLoggedIn ? (
    children
 ):(
    <Navigate to={'/home'} replace={true} />
 )
 /* if(isLoggedIn){
    if(role && roles.includes(role)){
        return children;
    }else if(role && !roles.includes(role)){
        redirect("/home");
        return null
    }

    return children;
 }
 return null */
}