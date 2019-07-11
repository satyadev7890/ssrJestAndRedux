pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
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
// // Jenkins for Node Applications
// // Version 0.1.0
// // Source cloned from: https://tools.lowes.com/stash/projects/D-FRW/repos/recipes/browse/jenkins/node-applications
// pipeline {
//     agent none
//     stages {
//         stage('Build Application') {
//             // agent {
//             //     docker {
//             //         label 'docker'
//             //         image 'nexus.d.lowes.com:8800/digital/node-build-agent:1.4.0'
//             //         args  '-v /home/jenkins/.ssh:/home/jenkins/.ssh'
//             //     }
//             // }
//             stages {
//                 stage('Install Dependencies') {
//                     steps {
//                         sh 'npm install'
//                     }
//                 }
//                 stage('Build App') {
//                     steps {
//                         sh 'npm run build'
//                     }
//                 }
//                 stage('Run Tests') {
//                     steps {
//                         sh 'npm test'
//                     }
//                 }
//                 stage('Prepare For Release') {
//                     when {
//                         branch 'master'
//                     }
//                     steps {
//                         sh 'npm prune --production'
//                     }
//                 }
//             }
//         }
//         stage('Build and Push Docker Image') {
//             agent { label 'docker' }
//             when {
//                 branch 'master'
//             }
//             steps {
//                 script {
//                     COMMIT_ID = sh(returnStdout: true, script: 'git rev-parse HEAD')
//                     IMAGE_TAG = "JENKINS-${env.BUILD_ID}_${BRANCH_NAME}_${COMMIT_ID}"

//                     sh 'echo $GCR_CREDENTIALS > keyfile.json'
//                     sh 'docker login -u _json_key -p "$(cat keyfile.json)" https://gcr.io'
//                     sh "docker build . -t ${GCR_REPO}:${IMAGE_TAG}"
//                     sh "docker push ${GCR_REPO}:${IMAGE_TAG}"
//                     sh 'docker logout https://gcr.io'
//                 }
//             }
//         }
//     }
// }