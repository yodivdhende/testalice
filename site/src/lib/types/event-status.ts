export const EventStatus = {
	Draft: 'Draft',
	Open: 'Open',
	Live: 'Live',
	Canceled: 'Canceled',
} as const 
export type EventStatus = typeof EventStatus[keyof typeof EventStatus];