import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
	id: string;
	name: string | null;
	email: string | null;
	emailVerified: string | null;
	image: string | null;
	hashedPassword: string | null;
	createdAt: string;
	updatedAt: string;
}

interface UserStore {
	currentUser: User | null;
	isLoading: boolean;
	error: string | null;

	setCurrentUser: (user: User | null) => void;
	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	clearUser: () => void;
	initializeUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>()(
	devtools(
		persist(
			(set, get) => ({
				currentUser: null,
				isLoading: false,
				error: null,

				setCurrentUser: (user) => set({ currentUser: user, error: null }),

				setLoading: (loading) => set({ isLoading: loading }),

				setError: (error) => set({ error }),

				clearUser: () => set({ currentUser: null, error: null }),

				initializeUser: async () => {
					// 避免重复初始化
					if (get().currentUser || get().isLoading) {
						return;
					}

					set({ isLoading: true, error: null });

					try {
						const response = await fetch("/api/user/current");

						if (!response.ok) {
							throw new Error("Failed to fetch user");
						}

						const user = await response.json();
						set({ currentUser: user, isLoading: false });
					} catch (error: any) {
						console.error("Failed to initialize user:", error);
						set({ error: error.message, isLoading: false, currentUser: null });
					}
				},
			}),
			{
				name: "user-storage",
				partialize: (state) => ({
					// 只持久化用户数据，不持久化 loading 和 error 状态
					currentUser: state.currentUser,
				}),
			}
		),
		{
			name: "UserStore",
		}
	)
);
