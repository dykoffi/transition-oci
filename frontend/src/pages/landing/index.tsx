import { useEffect, useState } from 'react';
import { useReactKeycloackId } from 'react-keycloak-id';

import GreenDarkUp from '../../assets/green-dark-up 1.svg';
import WingGreenDown from '../../assets/wing-green-down 1.svg';
import BulletsorangeLeft from '../../assets/bullets-gray-left.svg';
import BulletsGaryRight from '../../assets/bullets-gray-right.svg';
import Orange from '../../assets/orange.png';
import OrangeLanding from '../../assets/22-Orange-KD.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../config/store/store';
import { changeInfo, changeRole } from '../../config/store/feature/user';

const Landing = () => {
  const Dispatcher = useDispatch();
  const { logout, loadUserProfile, tokenParsed } = useReactKeycloackId();

  const user = useSelector((state: RootState) => state.user);
  const [profile, setProfile] = useState(JSON.parse(user.info));

  useEffect(() => {


    loadUserProfile()
      .then((data) => {
        console.log(data);

        const user = JSON.stringify(data);
        const role = JSON.stringify({
          realm_access: tokenParsed?.realm_access,
          resource_access: tokenParsed?.resource_access,
        });

        Dispatcher(changeInfo({ info: user }));
        Dispatcher(changeRole({ roles: role }));
        setProfile(data);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log('tokenParsed', tokenParsed);

  }, []);
  return (
    <>
      <section className="skewed-bottom-right">
        <nav className="relative px-6 py-6 flex justify-between items-center bg-orange-50">
          <a className="text-3xl font-bold leading-none" href="/home">
            <img className="h-14" src={Orange} alt="" width="auto" />
          </a>
          <div className="flex gap-3">
            <button
              className="hidden lg:flex lg:py-2 px-6 bg-white hover:bg-orange-50 text-sm text-green-600 font-bold rounded-l-xl rounded-t-xl transition duration-200"
              onClick={() => logout()}
            >
              Deconnexion
            </button>
          </div>
        </nav>
        <div className="bg-orange-50 pt-12 lg:pt-20 pb-20 radius-for-skewed">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full lg:w-1/2 px-4 mb-12 md:mb-20 lg:mb-0 flex items-center">
                <div className="w-full text-center lg:text-left">
                  <div className="max-w-xl mx-auto my-4 lg:mx-0">
                    <h2 className="mb-3 text-4xl lg:text-5xl font-bold font-heading">
                      <span>
                        Bienvenue {profile?.firstName} {profile?.lastName} sur la plateforme de
                      </span>
                      <span className="text-green-600"> Gestion des Sites de Orange CI</span>
                    </h2>
                  </div>
                  <div className="max-w-xl mx-auto lg:mx-0">
                    <div className="text-center flex justify-center">
                      <a
                        className="text-lg mb-3 lg:mb-0 lg:mr-3 lg:w-auto py-5 px-4 leading-loose bg-green-600 hover:bg-green-700 text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200"
                        href="https://app.powerbi.com/links/8hmFR7g_Gc?ctid=609dda63-b10e-4548-a02f-26b1fe7b022e&pbi_source=linkShare&bookmarkGuid=1a56746d-ddd0-4611-9c6b-6a39fb108323"
                        target={'_blank'}
                        rel={'noreferrer'}
                      >
                        Visualiser des tableaux de bord
                      </a>
                      <a
                        className="text-lg lg:w-auto py-5 px-4 leading-loose font-semibold bg-white hover:bg-orange-100 rounded-l-xl rounded-t-xl transition duration-200"
                        href="/gestion/historique"
                      >
                        Charger un nouveau fichier
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 px-4 flex items-center justify-center">
                <div className="relative" style={{ zIndex: 0 }}>
                  <img className="w-full object-cover rounded-3xl md:rounded-br-none" src={OrangeLanding} alt="" />
                  <img
                    className="hidden md:block absolute"
                    style={{ top: '-2rem', right: '3rem', zIndex: -1 }}
                    src={GreenDarkUp}
                    alt=""
                  />
                  <img
                    className="hidden md:block absolute"
                    style={{ bottom: '-2rem', right: '-2rem', zIndex: -1 }}
                    src={WingGreenDown}
                    alt=""
                  />
                  <img
                    className="hidden md:block absolute"
                    style={{ top: '3rem', right: '-3rem', zIndex: -1 }}
                    src={BulletsGaryRight}
                    alt=""
                  />
                  <img
                    className="hidden md:block absolute"
                    style={{ bottom: '2.5rem', left: '-4.5rem', zIndex: -1 }}
                    src={BulletsorangeLeft}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mr-for-radius">
          <svg className="h-8 md:h-12 lg:h-20 w-full text-orange-50" viewBox="0 0 10 10" preserveAspectRatio="none">
            <polygon fill="currentColor" points="0 0 10 0 0 10" />
          </svg>
        </div>

      </section>
    </>
  );
};

export default Landing;
