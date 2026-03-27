
FROM maven:3.9.6-eclipse-temurin-21


WORKDIR /app


COPY API/list/ .

RUN mvn clean package -DskipTests

EXPOSE 8080

CMD ["sh", "-c", "echo 'Arquivos em target:' && ls target && sleep 9999"]