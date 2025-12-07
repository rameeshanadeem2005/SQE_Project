pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['STAGING', 'PRODUCTION'], description: 'Select the environment to deploy')
    }

    environment {
        PATH = "C:\\Program Files\\nodejs;${env.PATH}"  // Node.js path on Windows
        STAGING_HOST = 'ec2-user@13.208.181.39'
        PROD_HOST    = 'ec2-user@<PRODUCTION_EC2_IP>'
        APP_PATH = '/home/ec2-user/idurar-erp-crm'
        SSH_CREDENTIALS_ID = 'ec2-user-ssh-key'
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
                    bat 'npm test'
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

        stage('Deploy to Environment') {
            steps {
                script {
                    def targetHost = params.ENVIRONMENT == 'STAGING' ? env.STAGING_HOST : env.PROD_HOST
                    echo "Deploying to ${params.ENVIRONMENT} environment at ${targetHost}..."

                    sshagent([env.SSH_CREDENTIALS_ID]) {
                        // Copy backend files to EC2
                        bat """
                        pscp -r backend\\* ${targetHost}:${APP_PATH}/backend/
                        """

                        // Restart backend on EC2
                        bat """
                        plink ${targetHost} "cd ${APP_PATH}/backend && npm install && pm2 restart ${params.ENVIRONMENT}-backend || pm2 start src/server.js --name ${params.ENVIRONMENT}-backend"
                        """
                    }
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
