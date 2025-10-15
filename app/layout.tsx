import dynamic from 'next/dynamic';
import { Nunito } from 'next/font/google';
import "../styles/globals.css";
import getCurrentUser from "./actions/getCurrentUser";
import { Analytics } from "@vercel/analytics/react";
const ClientOnly = dynamic(() => import('@/components/ClientOnly'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'));
const ToastContainerBar = dynamic(() => import('@/components/ToastContainerBar'), { ssr: false });
const LoginModal = dynamic(() => import('@/components/models/LoginModal'), { ssr: false });
const RegisterModal = dynamic(() => import('@/components/models/RegisterModal'), { ssr: false });
const RentModal = dynamic(() => import('@/components/models/RentModal'), { ssr: false });
const SearchModal = dynamic(() => import('@/components/models/SearchModal'), { ssr: false });
const ProfileModal = dynamic(() => import('@/components/models/ProfileModal'), { ssr: false });
const Navbar = dynamic(() => import('@/components/navbar/Navbar'),{ ssr: false });
const IntercomChat = dynamic(() => import('@/components/models/IntercomChat'),{ ssr: false });

export const metadata = {
  title: "Cabin Fantasy",
  description: "Cabin Fantasy for your renting and reserving needs",
  icons: "/assets/logo.png",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  
  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <ToastContainerBar />
          <SearchModal />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <ProfileModal currentUser={currentUser}/>
          <Navbar currentUser={currentUser} />
          <IntercomChat currentUser={currentUser}/>
        <div className='pb-20 pt-28'>{children}</div>
        <Footer />
        </ClientOnly>
        <Analytics/>
      </body>
    </html>
  );
}