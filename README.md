# raida-backend
Run apache kafka
docker-compose up -d

run command to setup kafka topic
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic update-location --partitions 1 \
  --replication-factor 1

start consumer-service


Start the app locally
