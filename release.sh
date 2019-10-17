# Githubにホストされたwoff, ttfを参照するように書き換える。

sed -i '' -e 's/\/element-icons/https:\/\/raw.githubusercontent.com\/moyutbc\/momiji\/master\/build\/dev\/element-icons/g' build/dev/index.css
sed -i '' -e 's/\/element-icons/https:\/\/raw.githubusercontent.com\/moyutbc\/momiji\/master\/build\/dev\/element-icons/g' build/prod/index.css
