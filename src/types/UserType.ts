import { OneAdType } from "./OneAdType";

export type UserType = {
    name: string;
    email: string;
    state: string;
    ads?: OneAdType[]
}