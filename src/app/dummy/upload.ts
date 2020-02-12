export class Upload {
    id: string;
    file: File;
    name: string;
    url: string;
    progress: number;
    created_date: Date = new Date();
    constructor(file: File) {
        this.file = file;
    }
}
