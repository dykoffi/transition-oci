export SONARQUBE_URL=https://system.sonarqube.eneci.net/
export YOUR_PROJECT_KEY=motower-backend
export YOUR_TOKEN=sqp_6ecdf76c2d98b9632e8621c9591635d263822578
export YOUR_REPO=./src

docker run \
    --rm \
    --network host \
    -e SONAR_HOST_URL="${SONARQUBE_URL}" \
    -e SONAR_SCANNER_OPTS="-Dsonar.projectKey=${YOUR_PROJECT_KEY}" \
    -e SONAR_TOKEN="${YOUR_TOKEN}" \
    -v "${YOUR_REPO}:/usr/src" \
    sonarsource/sonar-scanner-cli 