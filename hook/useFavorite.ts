import { SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import useLoginModel from "./useLoginModal";
import { useFavoritesStore } from "@/service/store/favorites";

type Props = {
	listingId: string;
	currentUser?: SafeUser | null;
};

function useFavorite({ listingId, currentUser }: Props) {
	const router = useRouter();
	const loginModel = useLoginModel();
	const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
	const optimisticToggle = useFavoritesStore((state) => state.optimisticToggle);
	const rollback = useFavoritesStore((state) => state.rollback);
	const confirmOptimistic = useFavoritesStore((state) => state.confirmOptimistic);

	// 节流控制API请求
	const lastRequestTimeRef = useRef<number>(0);
	const nextRequestTimerRef = useRef<NodeJS.Timeout | null>(null);
	const THROTTLE_TIME = 10000; // 节流限制

	const hasFavorite = useMemo(() => {
		return favoriteIds.has(listingId);
	}, [favoriteIds, listingId]);

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();

			if (!currentUser) {
				return loginModel.onOpen();
			}
			// 乐观更新：立即更新 UI
			const { previousState } = optimisticToggle(listingId);
			const now = Date.now();
			const timeSinceLastRequest = now - lastRequestTimeRef.current;

			// 真实请求
			const sendRequest = async () => {
				try {
					if (previousState) axios.delete(`/api/favorites/${listingId}`);
					else axios.post(`/api/favorites/${listingId}`);

					confirmOptimistic(listingId);
					router.refresh();
				} catch (error: any) {
					rollback(listingId, previousState);
					toast.error("Something Went Wrong");
				}
			};

			// ✅ 节流逻辑
			if (timeSinceLastRequest >= THROTTLE_TIME) {
				// 距离上次请求超过节流时间，立即发送
				lastRequestTimeRef.current = now;
				await sendRequest();
			} else {
				// 在节流期间，取消之前的定时器，安排新的请求
				if (nextRequestTimerRef.current) {
					clearTimeout(nextRequestTimerRef.current);
				}

				const remainingTime = THROTTLE_TIME - timeSinceLastRequest;

				nextRequestTimerRef.current = setTimeout(() => {
					lastRequestTimeRef.current = Date.now();
					sendRequest();
				}, remainingTime);
			}
		},
		[currentUser, listingId, router, loginModel, optimisticToggle, rollback, confirmOptimistic]
	);

	return {
		hasFavorite,
		toggleFavorite,
	};
}

export default useFavorite;
