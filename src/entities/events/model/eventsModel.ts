import {atom} from "@reatom/framework";
import {EventsFilter} from "@/entities/events";

export const searchAtom = atom<string>("", "events/search");
export const filterAtom = atom<EventsFilter>({
	priceRange: [0, 100],
	startedAt: new Date(),
	endedAt: new Date(),
	location: "",
	tags: []
}, "events/filter");
