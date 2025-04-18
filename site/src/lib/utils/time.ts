export function getTommorow(): Date {
    return new Date(new Date().getTime() + 1*24*60*60*1000);
}
