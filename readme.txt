use the command


git subtree push --prefix dist origin master

to push the distribution folder as main to the origin master remote -->> display the website once packer is done



https://forum.freecodecamp.org/t/delete-a-git-branch-both-locally-and-remotely/13211

run deploy to publish to gh-pages

steps to deploy:

//remove the master branch
git push origin :master

//push the dist folder to it
git subtree push --prefix dist origin master