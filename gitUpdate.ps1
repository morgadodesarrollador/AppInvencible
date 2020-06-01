Param(
    [string] $Primero = "first commit",
    [string] $Segundo 
)

git status
git add .
git commit -m $Primero
git push -u origin master