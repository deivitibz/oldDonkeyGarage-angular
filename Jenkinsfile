pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 4200:4200'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
    }
}
