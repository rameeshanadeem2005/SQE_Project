pipeline {
    agent any

    environment {
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
                    bat 'npm test'
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
                        sh 'cp -r frontend/dist/* backend/public/'
                    } else {
                        dir('frontend') {
                            bat '''
                            if not exist ..\\backend\\public mkdir ..\\backend\\public
                            xcopy dist\\* ..\\backend\\public /E /I /Y
                            '''
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo "Deployment steps here..."
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
