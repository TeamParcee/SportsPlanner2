export class Plan {

    constructor(
        public id: string,
        public datetime: string,
        public activityCount: number,
        public isoDatetime?: string,
        public timestamp?: number,
    ) { }
}