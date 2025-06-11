'use client';

import dynamic from 'next/dynamic';

const Home = dynamic(() => import('@/pages/home/ui/Home'), {
	ssr: false,
	loading: () => <div>Loading...</div>
});

export default function Page() {
	return <Home />;
}
