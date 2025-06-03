export type EventsFilter = {
	tags: string[];
	startedAt: Date;
	endedAt: Date;
	location: string;
	priceRange: [number, number];
}
