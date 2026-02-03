# Main Git Commands

## `git add`
Essentially selecting what files to commit.
```bash
git add file.txt   # stage a specific file or files
git add .           # stage all changes in current directory
``` 

## `git commit`
Saves staged changes to your local repo.
```bash
git commit -m "Describe changes"   # -m option for including a message
``` 

## `git push`
Uploads commits to current branch of remote repo.
```bash
git push

# to push a branch to remote repo
git push origin feature-branch
``` 

## `git pull`
Fetches changes made in the remote repo and merges them into current branch.

So it runs:
```bash
git fetch
git merge
```

## `git branch`
To create, delete, or list branches.
```bash
git branch                      # to list
git branch feature-branch       # to create
git branch -d feature-branch    # to delete
```

## `git checkout`
Switch between branches.
```bash
git checkout feature-branch     # switch to feature-branch
git checkout -b feature-branch  # creates feature-branch and switches to it
```

## `git merge`
Merges changes from specified branch into current branch.
```bash
# from main branch, this would merge the feature-branch into main.
git merge feature-branch
```

# Workflow (should follow this)
```bash
# pull any new changes
git pull

# create feature branch and switch to it
git checkout -b feature-branch

# after making changes add files and commit
git add file1.txt file2.txt
git commit -m "Implemented feature X"

# push branch to the remote repo 
# **if you have already done this just run git push to push new commits to the feature-branch
git push origin feature-branch
```
After all of this you should create a Pull Request on github for others to review.