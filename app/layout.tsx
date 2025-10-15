import dynamic from "next/dynamic";
import { Nunito } from "next/font/google";
import "../styles/globals.css";
import getCurrentUser from "../service/actions/getCurrentUser";
import { useFavoritesStore } from "@/service/store/favorites";
import { Analytics } from "@vercel/analytics/react";
const ClientOnly = dynamic(() => import("@/components/ClientOnly"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"));
const ToastContainerBar = dynamic(() => import("@/components/ToastContainerBar"), {
	ssr: false,
});
const LoginModal = dynamic(() => import("@/components/models/LoginModal"), { ssr: false });
const RegisterModal = dynamic(() => import("@/components/models/RegisterModal"), {
	ssr: false,
});
const RentModal = dynamic(() => import("@/components/models/RentModal"), { ssr: false });
const SearchModal = dynamic(() => import("@/components/models/SearchModal"), { ssr: false });
const ProfileModal = dynamic(() => import("@/components/models/ProfileModal"), { ssr: false });
const Navbar = dynamic(() => import("@/components/navbar/Navbar"), { ssr: false });
const FavoritesInitializer = dynamic(
	() => import("@/components/Initializer/FavoritesInitializer"),
	{
		ssr: false,
	}
);

// const IntercomChat = dynamic(() => import("@/components/models/IntercomChat"), { ssr: false });

export const metadata = {
	title: "Cabin Fantasy",
	description: "Cabin Fantasy for your renting and reserving needs",
	icons: "/assets/logo.png",
};

const font = Nunito({
	subsets: ["latin"],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	// 初始化用户数据
	const currentUser = await getCurrentUser();
	// 初始化收藏数据放在 FavoritesInitializer 组件中

	return (
		<html lang='en'>
			<body className={font.className}>
				<ClientOnly>
					<FavoritesInitializer currentUser={currentUser} />
					<ToastContainerBar />
					<SearchModal />
					<RegisterModal />
					<LoginModal />
					<RentModal />
					<ProfileModal currentUser={currentUser} />
					<Navbar currentUser={currentUser} />
					{/* <IntercomChat currentUser={currentUser} /> */}
					<div className='pb-20 pt-28'>{children}</div>
					<Footer />
				</ClientOnly>
				<Analytics />
			</body>
		</html>
	);
}
