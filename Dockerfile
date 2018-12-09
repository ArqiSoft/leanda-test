FROM hortonworks/cloudbreak-web-e2e:latest
COPY ./Bdd.Ui/ /protractor/project
COPY ./Data/ /protractor/Data/

ENTRYPOINT ["/entrypoint.sh", "yarn"]

