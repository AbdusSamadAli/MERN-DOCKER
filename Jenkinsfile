pipeline {
    agent any

    environment {
        COMPOSE_FILE = "docker-compose.yml"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Checking out source code..."
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building Docker images using docker-compose..."
                    sh "docker-compose -f ${COMPOSE_FILE} build"
                }
            }
        }

        stage('Stop Existing Containers') {
            steps {
                script {
                    echo "Stopping and removing existing containers (if any)..."
                    sh "docker-compose -f ${COMPOSE_FILE} down"
                }
            }
        }

        stage('Run Updated Containers') {
            steps {
                script {
                    echo 'Starting containers with latest images...'
                    sh "docker-compose -f ${COMPOSE_FILE} up -d"
                }
            }
        }
    }

    post {
        success {
            echo "Deployment successful! MERN stack is up and running via Docker Compose."
        }
        failure {
            echo "Pipeline failed. Check the logs above for details."
        }
    }
}
