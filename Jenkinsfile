pipeline {
    agent any
    tools {
        jdk 'JDK'
        maven 'Maven'
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building project...'
                // Use Maven to compile and package
                bat 'mvn clean package'
            }
        }
        stage('Archive') {
            steps {
                // Save the WAR file as a build artifact
                archiveArtifacts artifacts: 'target/*.war', fingerprint: true
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                // Add test commands here if needed
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying project...'
                // Optional: Docker build/push or deploy commands
            }
        }
    }
}
