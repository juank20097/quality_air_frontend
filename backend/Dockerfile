FROM openjdk:17-jdk-slim

LABEL version="1.0"
LABEL name="quality_air_backend"

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo .jar desde la misma carpeta que el Dockerfile al contenedor
COPY *.jar /app/quality_air_backend.jar

EXPOSE 8080

# Comando para ejecutar tu aplicación
ENTRYPOINT ["java", "-jar", "quality_air_backend.jar"]
