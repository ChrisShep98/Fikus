FROM postgres:alpine
ENV POSTGRES_PASSWORD=postgres
COPY ./sql/*.sql /docker-entrypoint-initdb.d

# Dockerfiles are scripts that makes changes to "base" images that are confirmed to be stable by the community. The FROM statement is the base image. postgres:alpine is a linux operating system developed by the postgres team with postgres properly installed. alpine linux is a very light weight version of linux.

# This script takes the official docker image that the postgres team provides and adds an env variable on line 2, and copys files into the initialization directory in line 3. the result is a custom image that will run our sql scripts when it starts up