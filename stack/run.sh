##Define Variables
namespace=motower-ihm
keycloak_client=nest-app
keycloak_realm=gps-realm

## Ajouter le repo bitnami
helm repo add bitnami https://charts.bitnami.com/bitnami 

## Installer la chart keycloak
helm upgrade --install keycloak bitnami/keycloak --namespace $namespace --create-namespace --version "13.0.5" -f $(pwd)/keycloak_values.yaml 

## Copier le fichier keycloakify.tar.xz dans le conteneur de keycloak pour l'application du theme oci
tar cf - keycloakify-starter | kubectl exec -i -n $namespace keycloak-0 -- tar xf - -C /opt/bitnami/keycloak/themes/

## Importer et creer le Realm
keycloak_password=$(kubectl get secret --namespace $namespace keycloak -o jsonpath="{.data.admin-password}" | base64 -d)
tar cf - realm.json | kubectl exec -i -n $namespace keycloak-0 -- tar xf - -C /opt/bitnami/keycloak/
kubectl exec -i -n $namespace keycloak-0 -- kcadm.sh create realms -f /opt/bitnami/keycloak/realm.json --server http://localhost:8080 --realm master --user admin --password $keycloak_password

## Installer la chart postgres
helm upgrade --install postgres bitnami/postgresql --namespace $namespace --version "12.11.1" -f $(pwd)/postgres_values.yaml
# clear