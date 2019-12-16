export class Activity {
    constructor(
        public id: string,
        public name: string,
        public duration: number,
        public notes: string,
        public startTime: string,
        public order?: number,

    ) {

    }
}