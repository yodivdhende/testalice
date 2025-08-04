export function getTommorow(): Date {
    return new Date(new Date().getTime() + 1*24*60*60*1000);
}

export function dateToSqlstring(date: Date): string {
    return date.toISOString().split('.')[0].replace('T', ' ');
}

export function dateToHTMLDateTime(date: Date): string {
    // return date.toISOString().split('.')[0];
    return date.toISOString().split('T')[0];
}