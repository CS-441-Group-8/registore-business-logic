
/*

Using iso8601 format: YYYY-MM-DDTHH:MM:SS
'T' is a separator between date and time, it can be replaced with a space

Utility functions to help with date and time parsing, formatting, and validation
DATE FORMAT: YYYY-MM-DD HH:MM:SS
Example: 2021-10-31 12:00:00

*/

// Returns a datetime string in iso8601 format
export function currentDateTime(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export function isISO8601Date(dateString: string): boolean {
    const regex = new RegExp(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/);
    return regex.test(dateString);
}

export function dateToYYYYMMDD(date: Date): string {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return `${year}-${month}-${day}`;
}
