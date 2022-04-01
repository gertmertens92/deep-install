#! node
import { deepInstall } from './deep-install/deep-install';
import { deepInstallParameters } from './types/types';

let options: deepInstallParameters = {};

// get arguments after first two elements in process.argv
const args = process.argv.splice(2);

options = args.reduce<deepInstallParameters>((acc: deepInstallParameters, arg: string, index: number) => {
    switch (arg) {
        case "--yarn":
            acc.yarn = true;
            break;
        case "--force":
            acc.force = true;
            break;
        case "--fix":
            acc.fix = true;
            break;
        case "--skipRootFolder":
            acc.skipRootFolder = true;
            break;
        case "--dryRun":
            acc.dryRun = true;
            break;
        case "--exclude":
            acc.exclude = args[index + 1].split(",");
            break;
        case "--rootFolder":
            acc.rootFolder = args[index + 1];
            break;
    }
    return acc;
}, {});

deepInstall(options);