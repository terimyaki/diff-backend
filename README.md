# Diff
Create, save and track notes. This is the backend of the application.

## ArangoDB
It uses Foxx framework of ArangoDB to make it happen.

## Docker
docker run -d --name arangodb -e ARANGO_RANDOM_ROOT_PASSWORD=1 -p 8529:8529 arangodb 