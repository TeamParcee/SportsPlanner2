export class Plan {

    constructor(
        public id: string,
        public datetime: string,
        public activityCount: number,
        public isoDatetime?: string,
        public timestamp?: number,
        public endTimestamp?:number,
        public endTime?: string,
        public isoEndTime?: string,
        public date?:string,
    ) { }
}