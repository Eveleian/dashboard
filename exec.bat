CALL docker-compose build --no-cache
CALL docker-compose up -d
CALL .\gradlew clean build --info
CALL java -jar .\backend\build\libs\backend-0.0.1-SNAPSHOT.war