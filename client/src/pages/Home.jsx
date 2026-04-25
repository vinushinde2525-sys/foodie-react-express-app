import { lazy, Suspense } from 'react';
import HeroSection from '../components/home/HeroSection';
import PromoTicker from '../components/home/PromoTicker';
import { FoodGridSkeleton } from '../components/ui/Skeletons';

const FeaturedSection    = lazy(() => import('../components/home/FeaturedSection'));
const PopularSection     = lazy(() => import('../components/home/PopularSection'));
const CategoriesSection  = lazy(() => import('../components/home/CategoriesSection'));
const StatsSection       = lazy(() => import('../components/home/StatsSection'));
const TestimonialsSection = lazy(() => import('../components/home/TestimonialsSection'));
const ChefSection        = lazy(() => import('../components/home/ChefSection'));

export default function Home() {
  return (
    <div>
      <HeroSection />
      <PromoTicker />
      <Suspense fallback={<div className="py-20"><FoodGridSkeleton count={3} /></div>}>
        <CategoriesSection />
        <FeaturedSection />
        <PopularSection />
        <StatsSection />
        <ChefSection />
        <TestimonialsSection />
      </Suspense>
    </div>
  );
}
