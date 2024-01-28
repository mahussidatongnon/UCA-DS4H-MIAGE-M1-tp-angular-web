import { Professor } from "./professor.model";

export class Subject {
    _id!: string;
    name!: string;
    imageUrls!: string;
    professorIds!: string[] | Professor[];
}
