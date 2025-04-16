Clear-Host

Write-Host "Running the application... 🚀"

if (Get-Command bun -ErrorAction SilentlyContinue) {
    Write-Host "Running with Bun... 🦋"
    bun dev
} elseif (Get-Command pnpm -ErrorAction SilentlyContinue) {
    Write-Host "Running with pnpm... 🦜"
    pnpm dev
} elseif (Get-Command yarn -ErrorAction SilentlyContinue) {
    Write-Host "Running with Yarn... 🧶"
    yarn dev
} elseif (Get-Command npm -ErrorAction SilentlyContinue) {
    Write-Host "Running with npm... 📦"
    npm run dev
} else {
    Write-Host "❌ No supported package manager found (bun, pnpm, yarn, npm)."
}
