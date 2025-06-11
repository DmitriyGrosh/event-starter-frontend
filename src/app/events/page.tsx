'use client';

import dynamic from 'next/dynamic';

const Events = dynamic(() => import('@/pages/home/ui/Home'), {
	ssr: false,
	loading: () => <div>Loading...</div>
});

export default function Page() {
	return <Events />;
}