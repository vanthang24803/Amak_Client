#!/bin/bash

sh env.local.sh

cd ..

echo "Install dependencies  😍😍😍😍😍"

bun install

cd ./scripts

bash run.sh
