# ------------ Build Stage ------------
    FROM maven:3.9.6-eclipse-temurin-17 as build

    WORKDIR /app
    
    # Copy all backend files
    COPY . .
    
    # Build the application (skip tests for faster build)
    RUN mvn clean package -DskipTests
    
    # ------------ Run Stage ------------
    FROM eclipse-temurin:17-jdk-alpine
    
    WORKDIR /app
    
    # Copy the jar file from the build stage
    COPY --from=build /app/target/*.jar app.jar
    
    EXPOSE 8080
    
    ENTRYPOINT ["java", "-jar", "app.jar"]
    
