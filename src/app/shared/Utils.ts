export class Utils {
    private static week = [
        { id: 0, name: '' },
        { id: 1, name: 'Sunday' },
        { id: 2, name: 'Monday' },
        { id: 3, name: 'Tuesday' },
        { id: 4, name: 'Wednesday' },
        { id: 5, name: 'Thursday' },
        { id: 6, name: 'Friday' },
        { id: 7, name: 'Saturday' },
    ];

    private static months = [
        { id: 1, name: 'January', },
        { id: 2, name: 'February', },
        { id: 3, name: 'March', },
        { id: 4, name: 'April', },
        { id: 5, name: 'May', },
        { id: 6, name: 'June', },
        { id: 7, name: 'July', },
        { id: 8, name: 'August', },
        { id: 9, name: 'September', },
        { id: 10, name: 'October', },
        { id: 11, name: 'November', },
        { id: 12, name: 'December', },
    ];

    static getWeekData(): { id: number, name: string }[] {
        return this.week;
    }
    static getMonthsData(): { id: number, name: string }[] {
        return this.months;
    }

    static getDateObj(date: string): Date {
        return new Date(date);
    }

    static generateTime(hour: number, zeroLength: number, minute?: number, second?: number,): number | string {
        let h = (hour.toString().length < 2 ? '0' + hour : hour);
        let m = minute ? (minute.toString().length < 2 ? '0' + minute : minute) : '00';
        let s = second ? (second.toString().length < 2 ? '0' + second : second) : '00';


        return (h.toString() + ':' + (zeroLength == 1 ? m : (':' + m.toString() + s)));
    }
}
