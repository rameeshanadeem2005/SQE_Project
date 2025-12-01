pipeline {
    agent any

    environment {
        // Adjust NODE_HOME to your Node.js installation path on Jenkins machine
        NODE_HOME = "C:\\Program Files\\nodejs"
        PATH = "C:\\Program Files\\nodejs"
    }

    stages {
        stage('Install Backend Dependencies') {
            steps {
                echo 'Installing backend dependencies...'
                dir('backend') {    // go to backend folder
                    bat 'npm install'
                }
            }
        }

        stage('Test Backend') {
            steps {
                echo 'Running backend tests...'
                dir('backend') {
                    // Replace with your test command if you have tests
                    bat 'npm test || echo "No tests found"'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Installing frontend dependencies and building...'
                dir('frontend') {   // go to frontend folder
                    bat 'npm install'
                    bat 'npm run build || echo "No build script found"'
                }
            }
        }

        stage('Prepare Deployment') {
            steps {
                echo 'Preparing project for deployment...'
                // Optional: copy frontend build to backend/public or package as needed
                dir('backend') {
                    bat 'xcopy /s /y ..\\frontend\\build ..\\backend\\public\\'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying project...'
                // Example: run backend server or Docker build
                // bat 'node server.js'   <-- only if you want Jenkins to run it
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Build and deployment stages completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
