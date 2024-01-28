import { User } from "./user.model"

export class Professor {
    lastName!: String;
    firstName!: String;
    pictureUrl!: String;
    userId!: String | User;
}
