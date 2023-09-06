import { useEffect } from "react";
import { useReactKeycloackId } from "react-keycloak-id";
import { Outlet, useMatch, useNavigate } from "react-router";
import Orange from "../../assets/orange.png"
import { useSelector } from 'react-redux';
import { RootState } from "../../config/store/store";

const Gestion = ()=> {
    const { logout,authenticated } = useReactKeycloackId();
    const state = useSelector((state: RootState) => state.user) 
    const user_role = JSON.parse(state.roles);    
    const keycloak_client = import.meta.env.VITE_KEYCLOAK_CLIENT
    const role = user_role[keycloak_client]?user_role[keycloak_client].roles:[];
    const navigation = useNavigate();
    useEffect(()=>{
        if(!authenticated){
            navigation('/');
        }
    },[])

    return (
        <>
            <nav className="relative px-6 py-6 flex justify-between items-center bg-white">
                <a className="text-3xl font-bold leading-none" href="/home">
                <img
                    className="h-14"
                    src={Orange}
                    alt=""
                    width="auto"
                />
                 </a>
                <div className="flex gap-3">
                <a 
                className={`${useMatch('/home')? "bg-orange-400 hover:text-orange-400 hover:bg-orange-200 text-sm text-white":"bg-orange-50 hover:bg-orange-100 text-sm text-orange-400"}  hidden lg:flex lg:py-2 px-6 font-bold rounded-l-xl rounded-t-xl transition duration-200`}
                href="/home"
                >
                Retour à l'accueil
                </a>
                <a 
                className={`${useMatch('/gestion/historique')? "bg-orange-400 hover:text-orange-400 hover:bg-orange-200 text-sm text-white":"bg-orange-50 hover:bg-orange-100 text-sm text-orange-400"}  hidden lg:flex lg:py-2 px-6 font-bold rounded-l-xl rounded-t-xl transition duration-200`}
                href="/gestion/historique"
                >
                Historique
                </a>
                {role.includes('admin') && <a 
                className={`${useMatch('/gestion/admin')? "bg-orange-400 hover:text-orange-400 hover:bg-orange-200 text-sm text-white":"bg-orange-50 hover:bg-orange-100 text-sm text-orange-400"}  hidden lg:flex lg:py-2 px-6 font-bold rounded-l-xl rounded-t-xl transition duration-200`}
                href="/gestion/admin"
                >
                Administration
                </a>}
                <button 
                className="hidden lg:flex lg:py-2 px-6 bg-orange-50 hover:bg-orange-100 text-sm text-green-600 font-bold rounded-l-xl rounded-t-xl transition duration-200"
                onClick={()=> logout()}
                >
                Deconnexion
                </button>
                </div>
              
            </nav>
            <div className=' max-w-7xl container mx-auto'>
                <Outlet />
            </div>
        </>
    )
}

export default Gestion;