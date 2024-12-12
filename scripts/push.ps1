param (
    [string]$CommitName
)

if (-not $CommitName) {
    Write-Host "Please provide a commit name!" -ForegroundColor Red
    exit 1
}

Write-Host "Push commit $CommitName 🙀🙀🙀🙀🙀" -ForegroundColor Yellow

Set-Location ..

Write-Host "Add commit $CommitName 💀💀💀💀💀" -ForegroundColor Cyan
git add .

git commit -m "$CommitName"

Write-Host "Pushing to Github $CommitName 🦄🦄🦄🦄🦄" -ForegroundColor Green
git push

Write-Host "Pushing to Gitlab $CommitName 🦊🦊🦊🦊🦊" -ForegroundColor DarkMagenta
git push gitlab

Write-Host "Commited $CommitName successfully! ✔️✔️✔️✔️✔️" -ForegroundColor Blue
