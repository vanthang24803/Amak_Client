#!/bin/bash

COMMIT_NAME="$1"

echo "Push commit ${COMMIT_NAME} 🙀🙀🙀🙀🙀"

cd ../

echo "Add commit ${COMMIT_NAME} 💀💀💀💀💀"
git add .

git commit -m "${COMMIT_NAME}"

echo "Pushing Github ${COMMIT_NAME} 🦄🦄🦄🦄🦄"
git push 

echo "Pushing Gitlba ${COMMIT_NAME} 🦊🦊🦊🦊🦊"
git push gitlab

echo "Commited ${COMMIT_NAME} successfully! ✔️✔️✔️✔️✔️"
