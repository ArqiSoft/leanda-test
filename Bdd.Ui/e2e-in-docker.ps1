echo "start e2e test"

$dir = $pwd.FullName
$parentdir=(get-item $pwd).parent.FullName

echo $pwd
echo $parentdir

$cmd = 'docker run -it --privileged --rm --name e2e-tests -v ${pwd}:/protractor/project -v ${parentdir}:/protractor  -v /dev/shm:/dev/shm hortonworks/cloudbreak-web-e2e yarn test-all-features'
Invoke-Expression $cmd