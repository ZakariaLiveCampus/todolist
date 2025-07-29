pipeline {
    agent any

    stages {
        stage('git dl') {
            steps {
                git credentialsId: 'ZakariaLiveCampus', url: 'https://github.com/ZakariaLiveCampus/todolist.git'
            }
        }
        stage('Install dependencies') {
            steps {
                nodejs('node'){
                    dir('frontend') {
                        sh 'npm i'
                    }
                }
            }
        }
        stage('Run frontend tests') {
            steps {
                nodejs('node'){
                    dir('frontend') {
                        sh 'npm run test'
                    }
                }
            }
        }
        stage('Docker version') {
            steps {
                sh 'docker --version'
            }
        }
        stage('Tag repo') {
            steps{
                withCredentials([usernamePassword(credentialsId: 'GitHubTokenPackage', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                    sh """
                        git config user.email 'zakaria.saber@livecampus.me'
                        git config user.name 'ZakariaLiveCampus'
                        git tag version-${env.BUILD_ID}
                        git remote set-url origin https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/ZakariaLiveCampus/todolist.git
                        git push origin version-${env.BUILD_ID}
                    """
                }
            }
        }
    }
}
node {
    def registryProjet = "ghcr.io/zakarialivecampus/todolist"
    def IMAGE = "${registryProjet}:version-${env.BUILD_ID}"
    def img = stage("build image") {
        docker.build(IMAGE, "frontend")
    }
    stage("test image") {
        img.withRun("--name run-$BUILD_ID -p 5173:5173") {
            sh "curl http://localhost:5173 || true"
        }
    }
    stage("Push") {
        docker.withRegistry("https://ghcr.io","GitHubTokenPackage") {
            img.push('latest')
            img.push()
        }
    }
}

