#!/bin/sh
docker-compose build --no-cache
docker-compose up
./gradlew clean build --info
java -jar ./backend/build/libs/backend-0.0.1-SNAPSHOT.war