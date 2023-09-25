export SONARQUBE_URL=http://localhost:9099/
export YOUR_PROJECT_KEY=motower-frontend
export YOUR_REPO=./src

docker run \
    --rm \
    --network host \
    -e SONAR_HOST_URL="${SONARQUBE_URL}" \
    -e SONAR_SCANNER_OPTS="-Dsonar.projectKey=${YOUR_PROJECT_KEY}" \
    -e SONAR_TOKEN="sqp_87489d3417f15b86ecdba11460b82e0c4f1e0554" \
    -v "${YOUR_REPO}:/usr/src" \
    sonarsource/sonar-scanner-cli