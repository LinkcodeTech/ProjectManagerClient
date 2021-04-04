export interface Project<T> {
    _id: string;
    name: string;
    projectManager: any;
    developers: T[];
    tasks: any[];
}
