import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import childproc from 'child_process';

export default function deepInstall(options: deepInstallParameters) {
    let folders: string[] = [];

    const getDirs = (p: string) => readdirSync(p).filter((f: any) => statSync(join(p, f)).isDirectory()).filter((dir: string) => ['node_modules', ...options.exclude].indexOf(dir) === -1)
    const getPackageJson = (p: string) => readdirSync(p).filter((f: any) => !statSync(join(p, f)).isDirectory()).filter((file: string) => ['package.json'].indexOf(file) !== -1)

    const retrieveFolders = (path = ".", skip = true) => {
        if (!skip) {
            if (getPackageJson(path).length > 0) folders.push(path);
        }

        getDirs(path).map((p: any) => `${path}/${p}`).forEach((p: string | undefined) => retrieveFolders(p, false));
    };

    retrieveFolders();

    console.log('\n', "Found package.json in the following folders:", '\n', folders, '\n');

    folders.forEach(folder => {
        console.log('\n', `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, '\n', `Executing npm i in folder ${folder}`, '\n', `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`, '\n');

        childproc.execSync(`npm i`, { cwd: folder, stdio: 'inherit' });
    });
}

export type deepInstallParameters = {
    exclude: string[]
}