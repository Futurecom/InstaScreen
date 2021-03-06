#!/bin/sh
echo '######################################'
echo '#                SETUP               #'
echo '#              - START -             #'
echo '######################################'

echo '---- Cloning repo into /tmp ----'
cd /tmp
git clone https://${GH_OAUTH_TOKEN}@github.com/${GH_USER_NAME}/${GH_PROJECT_NAME} gh-pages 2>&1
cd gh-pages

echo '---- Set git settings ----'
git config --global user.name $GIT_AUTHOR_NAME
git config --global user.email $GIT_AUTHOR_EMAIL
git config --global push.default matching

echo '---- Switch to gh-pages branch ----'
git checkout gh-pages

echo '---- Rebase gh-pages ----'
git rebase master

echo '---- Push the changes ----'
git push -f https://${GH_OAUTH_TOKEN}@github.com/${GH_USER_NAME}/${GH_PROJECT_NAME} 2>&1

echo '######################################'
echo '#                SETUP               #'
echo '#            - FINISHED -            #'
echo '######################################'