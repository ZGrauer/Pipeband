<#
.SYNOPSIS
  Generates a manifest.json file for a directory of images.
.DESCRIPTION
  This script scans a specified directory for image files (jpg, jpeg, png, gif, webp)
  and prompts the user for alt text for each image. It then creates a manifest.json
  file in that directory, listing the filenames and their corresponding alt text.
.PARAMETER DirectoryPath
  The path to the directory containing the images. This parameter is mandatory.
.EXAMPLE
  ./Generate-Manifest.ps1 -DirectoryPath ./src/assets/photos/MyNewGallery/
  This command will process images in the specified directory and generate a manifest.json file.
#>
[CmdletBinding()]
param (
  [Parameter(Mandatory = $true, HelpMessage = "Enter the path to the directory containing the images.")]
  [string]$DirectoryPath
)

# --- Input Validation ---
if (-not (Test-Path -Path $DirectoryPath -PathType Container)) {
  Write-Error "Error: Directory '$DirectoryPath' not found or is not a directory."
  exit 1
}

# Normalize DirectoryPath to ensure it ends with a path separator
if (-not $DirectoryPath.EndsWith([System.IO.Path]::DirectorySeparatorChar)) {
  $DirectoryPath = $DirectoryPath + [System.IO.Path]::DirectorySeparatorChar
}

$ManifestFilePath = Join-Path -Path $DirectoryPath -ChildPath "manifest.json"

# --- User Confirmation for Overwrite ---
if (Test-Path -Path $ManifestFilePath -PathType Leaf) {
  $Confirmation = Read-Host "$ManifestFilePath already exists. Overwrite? (y/N)"
  if ($Confirmation -ne 'y') {
    Write-Host "Exiting without overwriting."
    exit 0
  }
}

# --- Image Processing ---
Write-Host "Processing directory: $DirectoryPath"

$ImageExtensions = @("*.jpg", "*.jpeg", "*.png", "*.gif", "*.webp")
# Get-ChildItem -Include works on the *contents* of the path, so Path needs a wildcard.
$JoinedPath = Join-Path -Path $DirectoryPath -ChildPath "*"
$ImageFiles = Get-ChildItem -Path $JoinedPath -Include $ImageExtensions -File

if ($null -eq $ImageFiles -or $ImageFiles.Count -eq 0) {
  Write-Host "No image files found in $DirectoryPath (with extensions: $($ImageExtensions -join ', '))."
  $EmptyConfirmation = Read-Host "Create an empty manifest.json? (y/N)"
  if ($EmptyConfirmation -eq 'y') {
    Set-Content -Path $ManifestFilePath -Value "[]" -Encoding UTF8
    Write-Host "Empty manifest.json generated successfully in $DirectoryPath"
  } else {
    Write-Host "Exiting without creating a manifest."
  }
  exit 0
}

$ManifestItems = [System.Collections.ArrayList]@()

foreach ($ImageFile in $ImageFiles) {
  Write-Host "Found image: $($ImageFile.Name)"
  $AltText = Read-Host "Enter alt text for $($ImageFile.Name)"
  
  $ManifestItem = [PSCustomObject]@{
    filename = $ImageFile.Name
    alt      = $AltText
  }
  [void]$ManifestItems.Add($ManifestItem)
}

# --- File Output ---
# ConvertTo-Json default depth is 2, which is fine for this flat structure.
# Using -Depth 5 as a safeguard as per original spec, though not strictly necessary here.
$JsonOutput = $ManifestItems | ConvertTo-Json -Depth 5

# Ensure the directory exists one last time (should be redundant due to initial check)
if (-not (Test-Path -Path (Split-Path $ManifestFilePath) -PathType Container)) {
    New-Item -ItemType Directory -Path (Split-Path $ManifestFilePath) -Force | Out-Null
}

Set-Content -Path $ManifestFilePath -Value $JsonOutput -Encoding UTF8
Write-Host "manifest.json generated successfully in $DirectoryPath"

exit 0
