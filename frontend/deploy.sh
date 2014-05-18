#!/bin/bash

REPO=/Users/naeem/documents/apps/frontend

set -e

cd $REPO
git add .
current_branch=`git branch | grep \* | sed 's/* //'`
files_changed=`git status -sb | wc -l`

if [[ $files_changed -gt 1 ]]
then
  git commit -am "AUTO COMMIT"
  git push origin $current_branch
fi