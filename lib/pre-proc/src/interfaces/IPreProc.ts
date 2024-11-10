
export interface IGroupDefines {
    [key: string]: any;
}

export interface IGroups {
    [key: string]: string[];
}

export interface IDefinitions {
    [key: string]: IGroupDefines;
}

export interface IPreProcDefaults {
    group: string;
    definition: string;
}

export interface IPreProcFile {
    repoRoot?: string;

    default?: IPreProcDefaults;

    groups?: IGroups;

    definitions?: IDefinitions;
}
