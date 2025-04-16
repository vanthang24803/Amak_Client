#!/bin/bash

clear

cd ..

cat <<EOF > .env.local
NODE_ENV=development
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_API_SOCKET=
NEXT_PUBLIC_URL=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_BUCKET=
NEXT_PUBLIC_FIREBASE_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
NEXT_PUBLIC_CLOUDFLARE_SITE_KEY=
NEXT_PUBLIC_CLOUDFLARE_SECRET_KET=
API_URL=
NEXT_PUBLIC_QR_IMAGE=
NEXT_PUBLIC_QR_KEY=
NEXT_PUBLIC_QR_ID=
NEXT_PUBLIC_QR_BANK_BIN=
NEXT_PUBLIC_QR_BANK_NAME=
NEXT_PUBLIC_QR_BANK_ID=
EOF

echo "Created .env.local successfully! 🎉🎉🎉🎉🎉🎉"

echo "Install dependencies 📦"

if command -v bun &> /dev/null; then
    echo "Installing with Bun... 🦋"
    bun install
elif command -v pnpm &> /dev/null; then
    echo "Installing with pnpm... 🦜"
    pnpm install
elif command -v yarn &> /dev/null; then
    echo "Installing with Yarn... 🧶"
    yarn install
elif command -v npm &> /dev/null; then
    echo "Installing with npm... 📦"
    npm install
else
    echo "❌ No supported package manager found (bun, pnpm, yarn, npm)."
    exit 1
fi

clear

echo "Running the application... 🚀"

if command -v bun &> /dev/null; then
    echo "Running with Bun... 🦋"
    bun dev
elif command -v pnpm &> /dev/null; then
    echo "Running with pnpm... 🦜"
    pnpm dev
elif command -v yarn &> /dev/null; then
    echo "Running with Yarn... 🧶"
    yarn dev
elif command -v npm &> /dev/null; then
    echo "Running with npm... 📦"
    npm run dev
else
    echo "❌ No supported package manager found (bun, pnpm, yarn, npm)."
    exit 1
fi
