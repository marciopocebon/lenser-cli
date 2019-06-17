# Hawkeye Lenser

The idea for project lenser was to bundle different image scanners under a common API, providing the options of filtering for failure levels and ignoring CVEs.

The image scanners are being brought up as docker containers in the docker-compose file.

## Notes to maintainers

Run locally for dev:

```
npm install
docker-compose up -d
./bin/lenser scan nginx:1.11.6-alpine --ip $(ifconfig | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}')
```
