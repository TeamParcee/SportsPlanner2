export class User {
    constructor(
        public fname: string,
        public lname: string,
        public uid: string,
        public email: string,
        public lastLogon: string,
        public photoURL: string
    ) { }
}