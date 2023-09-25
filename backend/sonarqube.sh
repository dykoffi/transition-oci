export SONARQUBE_URL=http://localhost:9099
export YOUR_PROJECT_KEY=motower-backend
export YOUR_REPO=./src

docker run \
    --rm \
    --network host \
    -e SONAR_HOST_URL="${SONARQUBE_URL}" \
    -e SONAR_SCANNER_OPTS="-Dsonar.projectKey=${YOUR_PROJECT_KEY}" \
    -e SONAR_TOKEN="sqp_1c134cad5ae3e2c5cbd55d13e1a454a3a0ca0546" \
    -v "${YOUR_REPO}:/usr/src" \
    sonarsource/sonar-scanner-cli