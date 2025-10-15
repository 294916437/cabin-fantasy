"use client";

import { useEffect } from "react";
import { SafeUser } from "@/types";
import { useFavoritesStore } from "@/service/store/favorites";

type Props = {
	currentUser?: SafeUser | null;
};

export default function FavoritesInitializer({ currentUser }: Props) {
	const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
	const initializeFavorites = useFavoritesStore((state) => state.initializeFavorites);

	useEffect(() => {
		// 首次加载时，如果 store 为空且用户有收藏数据，则初始化 store
		if (currentUser?.favoriteIds && favoriteIds.size === 0) {
			console.log("🚀 Initializing favorites from server:", currentUser.favoriteIds);
			initializeFavorites(currentUser.favoriteIds);
		}
	}, [currentUser, favoriteIds, initializeFavorites]);

	return null;
}
