import { useReactKeycloackId } from "react-keycloak-id";
import { Navigate } from 'react-router-dom';
import { KEYCLOAK_CLIENT } from "../constant";



interface Props {
    children: JSX.Element,
}

export default function PrivateRoute ({children}:Props) {
 const { authenticated,tokenParsed } = useReactKeycloackId();
 const user_role:any = tokenParsed?.resource_access;
 const roles = user_role[KEYCLOAK_CLIENT]?user_role[KEYCLOAK_CLIENT].roles:[];

 // TODO Why define it
 const isLoggedIn = authenticated;
 

 return isLoggedIn? (
    children
 ):(
    <Navigate to={'/'} replace={true} />
 )
}