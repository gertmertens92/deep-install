# deep-install
A library that will traverse your project, search for package.json files and executes the install method of your choice.
Standard npm install will be used unless instructed otherwise by available parameters. 

## Installation
using npm globally:

```bash
$ npm install -s deep-install
```

## Execute the module
Where you would like the module to start as the root folder, execute the following command:

```bash
$ deep-install
```

## Available options
```bash
# npm install --force
$ deep-install --force

# npm audit fix
$ deep-install --fix

# yarn install
$ deep-install --yarn

# Skip the rootfolder
$ deep-install --skipRootFolder

# Change the rootfolder
$ deep-install --rootFolder ../

# Exclude folders
$ deep-install --exclude Exclude1,Exclude2,..

# Execute a dryrun (Will not run install)
$ deep-install --dryRun
```