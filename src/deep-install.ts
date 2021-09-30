import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import childproc from 'child_process';

async function deepInstall(options: deepInstallParameters) {
    options = options || {};

    let folders: string[] = [];

    const getDirs = (p: string) => readdirSync(p).filter((f: any) => statSync(join(p, f)).isDirectory()).filter((dir: string) => ['node_modules', ...options.exclude].indexOf(dir) === -1)
    const getPackageJson = (p: string) => readdirSync(p).filter((f: any) => !statSync(join(p, f)).isDirectory()).filter((file: string) => ['package.json'].indexOf(file) !== -1)

    const retrieveFolders = (path = ".", skip = true) => {
        if (!skip) {
            if (getPackageJson(path).length > 0) folders.push(path);
        }

        getDirs(path).map((p: any) => `${path}/${p}`).forEach((p: string | undefined) => retrieveFolders(p, false));
    };

    retrieveFolders(options.rootFolder, options.skipRootFolder);

    if (folders.length > 0) {
        console.log('\n', "Found package.json in the following folders:", '\n', folders, '\n');

        folders.forEach(folder => {
            console.log('\n', `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, '\n', `Executing npm install in folder ${folder}`, '\n', `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, '\n');

            childproc.execSync(`npm install`, { cwd: folder, stdio: 'inherit' });
        });
    } else {
        console.error('\n', "No package.json found.", '\n');
    }
}

export type deepInstallParameters = {
    exclude: string[],
    skipRootFolder?: boolean,
    rootFolder?: string
}

module.exports = deepInstall;