import { useReactKeycloackId } from "react-keycloak-id";
import { Navigate } from 'react-router-dom';


interface Props {
   children: JSX.Element,
}

export default function PrivateRoute({ children }: Props) {
   const { authenticated } = useReactKeycloackId();


   return authenticated ? (
      children
   ) : (
      <Navigate to={'/'} replace={true} />
   )
}