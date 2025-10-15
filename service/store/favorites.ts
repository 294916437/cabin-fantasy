import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesStore {
	favoriteIds: Set<string>;
	optimisticIds: Set<string>;

	// 乐观更新相关
	optimisticToggle: (id: string) => { previousState: boolean };
	rollback: (id: string, previousState: boolean) => void;
	confirmOptimistic: (id: string) => void;

	// 初始化
	initializeFavorites: (ids: string[]) => void;

	// 工具方法
	getFavoriteIdsArray: () => string[];
}

export const useFavoritesStore = create<FavoritesStore>()(
	persist(
		(set, get) => ({
			favoriteIds: new Set<string>(),
			optimisticIds: new Set<string>(),

			// 初始化收藏列表（从服务端数据）
			initializeFavorites: (ids: string[]) => {
				set({ favoriteIds: new Set(ids) });
			},

			// 乐观更新：立即切换状态并记录原始状态
			optimisticToggle: (id) => {
				const previousState = get().favoriteIds.has(id);

				set((state) => {
					const newOptimistic = new Set(state.optimisticIds);
					newOptimistic.add(id);

					const newFavorites = new Set(state.favoriteIds);
					if (previousState) {
						newFavorites.delete(id);
					} else {
						newFavorites.add(id);
					}

					return {
						favoriteIds: newFavorites,
						optimisticIds: newOptimistic,
					};
				});

				return { previousState };
			},

			// 回滚到之前的状态
			rollback: (id, previousState) => {
				set((state) => {
					const newOptimistic = new Set(state.optimisticIds);
					newOptimistic.delete(id);

					const newFavorites = new Set(state.favoriteIds);
					if (previousState) {
						newFavorites.add(id); // 恢复收藏
					} else {
						newFavorites.delete(id); // 移除收藏
					}

					return {
						favoriteIds: newFavorites,
						optimisticIds: newOptimistic,
					};
				});
			},

			// 确认乐观更新成功
			confirmOptimistic: (id) => {
				set((state) => {
					const newOptimistic = new Set(state.optimisticIds);
					newOptimistic.delete(id);
					return { optimisticIds: newOptimistic };
				});
			},

			// 获取数组形式（用于兼容需要数组的场景）
			getFavoriteIdsArray: () => Array.from(get().favoriteIds),
		}),
		{
			name: "favorites-storage",
			partialize: (state) => ({
				favoriteIds: Array.from(state.favoriteIds),
			}),
			merge: (persistedState, currentState) => {
				const persisted = persistedState as any;
				return {
					...currentState,
					favoriteIds: new Set(persisted?.favoriteIds || []),
				};
			},
		}
	)
);
