pipeline {
    agent any

    environment {
        PATH = "/usr/bin/node:${env.PATH}"
        SSH_CREDENTIALS_ID = 'ec2-user-ssh-key' // Jenkins credential ID for EC2
        EC2_HOST = 'ec2-user@13.208.181.39'   // replace with your EC2 public IP
        APP_PATH = '/home/ec2-user/idurar-erp-crm' // path on EC2
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
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Prepare Deployment') {
            steps {
                echo "Copying frontend build to backend public folder..."
                sh 'cp -r frontend/dist/* backend/public/'
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo "Deploying to staging EC2..."
                sshagent(['SSH_CREDENTIALS_ID']) {
                    // Copy files to EC2
                    sh """
                    scp -r backend/* ${EC2_HOST}:${APP_PATH}/backend/
                    """
                    // Restart backend on EC2
                    sh """
                    ssh ${EC2_HOST} << 'ENDSSH'
                        cd ${APP_PATH}/backend
                        npm install
                        pm2 restart staging-backend || pm2 start src/server.js --name staging-backend
                    ENDSSH
                    """
                }
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
