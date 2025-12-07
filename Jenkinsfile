pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['STAGING', 'PRODUCTION'], description: 'Select the environment to deploy')
    }

    environment {
        PATH = "/usr/bin/node:${env.PATH}"
        STAGING_HOST = 'ec2-user@13.208.181.39'
        PROD_HOST    = 'ec2-user@<PRODUCTION_EC2_IP>'
        APP_PATH = '/home/ec2-user/idurar-erp-crm'
        SSH_CREDENTIALS_ID = 'ec2-user-ssh-key' // Jenkins credential ID for EC2
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

        stage('Test Backend') {
            steps {
                dir('backend') {
                    sh 'npm test'
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

        stage('Test Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm test'
                }
            }
        }

        stage('Prepare Deployment') {
            steps {
                echo "Copying frontend build to backend public folder..."
                sh 'cp -r frontend/dist/* backend/public/'
            }
        }

        stage('Deploy to Environment') {
            steps {
                script {
                    def targetHost = params.ENVIRONMENT == 'STAGING' ? env.STAGING_HOST : env.PROD_HOST
                    echo "Deploying to ${params.ENVIRONMENT} environment at ${targetHost}..."

                    sshagent([env.SSH_CREDENTIALS_ID]) {
                        sh """
                        # Copy backend files to EC2
                        scp -r backend/* ${targetHost}:${APP_PATH}/backend/

                        # Install dependencies and restart server
                        ssh ${targetHost} << 'ENDSSH'
                            cd ${APP_PATH}/backend
                            npm install
                            pm2 restart ${params.ENVIRONMENT}-backend || pm2 start src/server.js --name ${params.ENVIRONMENT}-backend
                        ENDSSH
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
