$p = 'app\content\curriculum\bug-bounty-competitive-audits.mdx'
$c = [System.IO.File]::ReadAllText($p)
$c = $c -replace '- q: "Why is "works on mainnet" not enough to claim a bounty?"', '  - q: ''Why is "works on mainnet" not enough to claim a bounty?'''
$c = $c -replace '- q: "What moves a submission from duplicate to "marginal" or "valid"?"', '  - q: ''What moves a submission from duplicate to "marginal" or "valid"?''
[System.IO.File]::WriteAllText($p, $c, (New-Object System.Text.UTF8Encoding($false)))
Write-Output "bug-bounty fixed"

$p2 = 'app\content\curriculum\writing-audit-reports.mdx'
$c2 = [System.IO.File]::ReadAllText($p2)
$c2 = $c2 -replace '- q: "What belongs in a recommended fix beyond "rewrite the function"?"', '  - q: ''What belongs in a recommended fix beyond "rewrite the function"?''
[System.IO.File]::WriteAllText($p2, $c2, (New-Object System.Text.UTF8Encoding($false)))
Write-Output "writing-audit fixed"
