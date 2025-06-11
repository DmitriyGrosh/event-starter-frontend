'use client';

import dynamic from 'next/dynamic';

const EventDetails = dynamic(() => import('@/pages/event-details/ui/EventDetails'), {
	ssr: false,
	loading: () => <div>Loading...</div>
});

export default function Page() {
	return <EventDetails />;
}