import { User } from "./user.model";

export class Student {
    _id!: String;   
    lastName!: String;
    firstName!: String;
    pictureUrl!: String;
    userId!: String | User;
}
