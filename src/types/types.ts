#! node
export type deepInstallParameters = {
    exclude?: string[],
    skipRootFolder?: boolean,
    rootFolder?: string,
    force?: boolean,
    fix?: boolean,
    yarn?: boolean,
    dryRun?: boolean
}