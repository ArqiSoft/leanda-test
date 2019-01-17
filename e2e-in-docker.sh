#!/usr/bin/env bash

echo "start e2e test"

dir=$(PWD)
parentdir="$(dirname "$dir")"

docker run -it --privileged --rm --name e2e-tests -v $(PWD):/protractor/project -v ${parentdir}:/protractor  -v /dev/shm:/dev/shm hortonworks/cloudbreak-web-e2e yarn test-all-features