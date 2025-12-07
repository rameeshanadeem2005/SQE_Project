pipeline {
    agent any

    environment {
        PATH = "C:\\Program Files\\nodejs;${env.PATH}"
        EC2_HOST = "ec2-user@13.208.181.39"  // your EC2 public IP
        APP_PATH = "/home/ec2-user/idurar-erp-crm" // EC2 app path
        PRIVATE_KEY = "C:\\Users\\ramee\\.ssh\\ec2-key.ppk" // path to your EC2 private key
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
                    bat 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Test Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm test'
                }
            }
        }

        stage('Prepare Deployment') {
            steps {
                echo "Copying frontend build to backend public folder..."
                bat 'xcopy /E /Y frontend\\dist\\* backend\\public\\'
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo "Deploying to STAGING environment..."
                
                // Copy backend to EC2
                bat """
                pscp -i ${PRIVATE_KEY} -r backend\\* ${EC2_HOST}:${APP_PATH}/backend/
                """

                // Restart backend on EC2
                bat """
                plink -i ${PRIVATE_KEY} ${EC2_HOST} "cd ${APP_PATH}/backend && npm install && pm2 restart staging-backend || pm2 start src/server.js --name staging-backend"
                """
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
            echo "Pipeline failed. Check"
        }
    }
}
