'use client';

import dynamic from 'next/dynamic';

const Home = dynamic(() => import('@/pages/home/Home'), {
	ssr: false,
	loading: () => <div>Loading...</div>
});

export default function Page() {
	return <Home />;
}
