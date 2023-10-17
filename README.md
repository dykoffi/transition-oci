1. Create namespace motower-ihm
```bash
kubectl create ns motower
```
2. Install Stack chart helm (Postgres and keycloak)
```bash
cd stack
sh run.sh
```

3. Build backend image and push it on docker registry
4. Create kubernetes imagePullsecret for pulling image from private registry
```bash
kubectl create secret docker-registry <secretName> --docker-server= --docker-user= --docker-password=
```

4. Run backend deployement
```bash
cd k8s
kubectl apply -f back.yml
```