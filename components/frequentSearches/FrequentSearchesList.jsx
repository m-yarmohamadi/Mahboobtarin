import useMainPage from '@/hooks/useMainPage';
import FrequentSearches from './FrequentSearches';
import PopularWeek from './PopularWeek';

export default function FrequentSearchesList() {
	const { top_search, popular_week, isLoading } = useMainPage();

	if (isLoading) return null;

	return (
		<div className="md:container px-0  pr-4 lg:pr-0 space-y-14 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-6">
			<div className="lg:col-span-8">
				<FrequentSearches topSearch={top_search} />
			</div>
			<div className="lg:col-span-4">
				<PopularWeek popularWeek={popular_week} />
			</div>
		</div>
	);
}
