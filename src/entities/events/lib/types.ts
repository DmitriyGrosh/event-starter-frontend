export type EventsFilter = {
	tags: string[];
	startedAt: Date | null;
	endedAt: Date | null;
	location: string;
	priceRange: [number, number];
}

export interface Filters {
    fromDate: string | null;
    toDate: string | null;
    tags: string[];
    location: string | null;
    priceRange: [number, number] | [];
}
