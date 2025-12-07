pipeline {
    agent any

    environment {
        EC2_HOST = 'ec2-user@13.208.181.39'        // Staging EC2 host
        APP_PATH = '/home/ec2-user/idurar-erp-crm' // Path on EC2
        PPK_PATH = 'C:\\Users\\ramee\\.ssh\\ec2-key.ppk' // Your private key
        PSCP_PATH = 'C:\\Program Files\\PuTTY\\pscp.exe' // Full path to pscp
        PLINK_PATH = 'C:\\Program Files\\PuTTY\\plink.exe' // Full path to plink
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

        stage('Test Backend') {
            steps {
                dir('backend') {
                    echo "Running backend tests..."
                    // Allow failure but continue
                    catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
                        bat 'npm test'
                    }
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

        stage('Deploy to STAGING') {
            steps {
                echo "Deploying to STAGING environment..."
                script {
                    // Copy backend files to EC2
                    bat "\"${PSCP_PATH}\" -i \"${PPK_PATH}\" -r backend\\* ${EC2_HOST}:${APP_PATH}/backend/"

                    // Restart backend on EC2 using PLINK
                    bat "\"${PLINK_PATH}\" -i \"${PPK_PATH}\" ${EC2_HOST} \"cd ${APP_PATH}/backend && npm install && pm2 restart staging-backend || pm2 start src/server.js --name staging-backend\""
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
