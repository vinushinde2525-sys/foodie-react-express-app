import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { foodApi, orderApi, reviewApi } from '../services/api';

// ─── Query Keys ───────────────────────────────────────────────────────────────
export const KEYS = {
  foods:      (params) => ['foods', params],
  food:       (id)     => ['food', id],
  categories: ()       => ['categories'],
  popular:    ()       => ['popular'],
  featured:   ()       => ['featured'],
  stats:      ()       => ['stats'],
  reviews:    (foodId) => ['reviews', foodId],
  order:      (id)     => ['order', id],
};

// ─── Food Hooks ───────────────────────────────────────────────────────────────
export const useFoods = (params = {}) =>
  useQuery({
    queryKey: KEYS.foods(params),
    queryFn:  () => foodApi.getAll(params),
    select:   (data) => data.data,
  });

export const useFood = (id) =>
  useQuery({
    queryKey: KEYS.food(id),
    queryFn:  () => foodApi.getById(id),
    select:   (data) => data.data,
    enabled:  !!id,
  });

export const useCategories = () =>
  useQuery({
    queryKey: KEYS.categories(),
    queryFn:  foodApi.getCategories,
    select:   (data) => data.data,
    staleTime: Infinity,
  });

export const usePopularFoods = () =>
  useQuery({
    queryKey: KEYS.popular(),
    queryFn:  foodApi.getPopular,
    select:   (data) => data.data,
  });

export const useFeaturedFoods = () =>
  useQuery({
    queryKey: KEYS.featured(),
    queryFn:  foodApi.getFeatured,
    select:   (data) => data.data,
  });

export const useStats = () =>
  useQuery({
    queryKey: KEYS.stats(),
    queryFn:  foodApi.getStats,
    select:   (data) => data.data,
  });

// ─── Review Hooks ─────────────────────────────────────────────────────────────
export const useReviews = (foodId) =>
  useQuery({
    queryKey: KEYS.reviews(foodId),
    queryFn:  () => reviewApi.getByFood(foodId),
    select:   (data) => data.data,
    enabled:  !!foodId,
  });

// ─── Order Hooks ──────────────────────────────────────────────────────────────
export const useCreateOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: orderApi.create,
    onSuccess:  () => qc.invalidateQueries({ queryKey: ['orders'] }),
  });
};

export const useOrder = (orderId) =>
  useQuery({
    queryKey: KEYS.order(orderId),
    queryFn:  () => orderApi.getById(orderId),
    select:   (data) => data.data,
    enabled:  !!orderId,
  });
