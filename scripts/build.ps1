Set-Location ..

Write-Host "Running build application 💀💀💀💀💀"

if (Test-Path .next) {
    Remove-Item -Recurse -Force .next
}

bun run build

Write-Host "Application build success 🎉🎉🎉🎉🎉🎉"
