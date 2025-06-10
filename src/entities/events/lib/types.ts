export type EventsFilter = {
	tags: string[];
	startedAt: Date | null;
	endedAt: Date | null;
	location: string;
	priceRange: [number, number];
}
