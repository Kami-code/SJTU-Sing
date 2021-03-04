


echo "hello"

ls *.md |
while read file_name;
do
    # 用.为分隔符只要文件名，去掉文件后缀
    echo "${file_name%.*}:" >> all.md
    cat "$file_name" >> all.md
    echo "" >> all.md
	echo "hello"
done
echo "bye"
rm -f ../../README.md
cp -rf all.md ../../README.md
rm -f all.md
cd ../../
git init
git pull
git remote add origin https://github.com/Kami-code/software-engineering-project.git
git add README.md
git commit -m "update README.md"
git push -u origin master