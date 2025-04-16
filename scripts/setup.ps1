Clear-Host

Set-Location ..

@'
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
'@ > .env.local

Write-Host 'Created .env.local successfully! 🎉🎉🎉🎉🎉🎉'

Write-Host 'Install dependencies 📦'

if (Get-Command bun -ErrorAction SilentlyContinue) {
    Write-Host 'Installing with Bun... 🦋'
    bun install
} 
elseif (Get-Command pnpm -ErrorAction SilentlyContinue) {
    Write-Host 'Installing with pnpm... 🦜'
    pnpm install
}
elseif (Get-Command yarn -ErrorAction SilentlyContinue) {
    Write-Host 'Installing with Yarn... 🧶'
    yarn install
}
elseif (Get-Command npm -ErrorAction SilentlyContinue) {
    Write-Host 'Installing with npm... 📦'
    npm install
}
else {
    Write-Host '❌ No supported package manager found (bun, pnpm, yarn, npm).'
}

Clear-Host

Write-Host 'Running the application... 🚀'

if (Get-Command bun -ErrorAction SilentlyContinue) {
    Write-Host 'Running with Bun... 🦋'
    bun dev
} elseif (Get-Command pnpm -ErrorAction SilentlyContinue) {
    Write-Host 'Running with pnpm... 🦜'
    pnpm dev
} elseif (Get-Command yarn -ErrorAction SilentlyContinue) {
    Write-Host 'Running with Yarn... 🧶'
    yarn dev
} elseif (Get-Command npm -ErrorAction SilentlyContinue) {
    Write-Host 'Running with npm... 📦'
    npm run dev
} else {
    Write-Host '❌ No supported package manager found (bun, pnpm, yarn, npm).'
}
