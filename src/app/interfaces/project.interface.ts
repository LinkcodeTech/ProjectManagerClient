export interface Project<T> {
    _id: string;
    name: string;
    projectManager: string;
    developers: T[];
}
