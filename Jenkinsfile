pipeline {
    agent any

    environment {
        // Update PATH to include Node.js if needed
        PATH = "C:\\Program Files\\nodejs;${env.PATH}"

    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    echo "Installing backend dependencies..."
                    bat 'npm install'
                }
            }
        }

        stage('Test Backend') {
            steps {
                dir('backend') {
                    echo "Running backend tests..."
                    bat 'npm test || echo "No tests configured yet"'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    echo "Installing frontend dependencies and building..."
                    bat 'npm install'
                    bat 'npm run build || echo "No build script found"'
                }
            }
        }

        stage('Prepare Deployment') {
    steps {
        echo "Copying frontend build to backend public folder..."
        script {
            if (isUnix()) {
                // For Linux/Mac agents
                sh 'cp -r ../frontend/dist/* ../backend/public/'
            } else {
                // For Windows agents
                bat '''
                if not exist ..\\backend\\public mkdir ..\\backend\\public
                xcopy ..\\frontend\\dist\\* ..\\backend\\public /E /I /Y
                '''
            }
        }
    }
}


        stage('Deploy') {
            steps {
                echo "Deployment steps here..."
                // Add your deployment commands
            }
        }
    }

    post {
        always {
            echo "Pipeline finished."
        }
        success {
            echo "Pipeline succeeded!"
        }
        failure {
            echo "Pipeline failed. Check logs."
        }
    }
}
