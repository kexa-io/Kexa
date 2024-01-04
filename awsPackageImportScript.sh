packages=(
'@aws-sdk/client-rds'
)

for pkg in "${awsPackages[@]}"
do
    npm install "$pkg" || echo "Failed to install $pkg"
done