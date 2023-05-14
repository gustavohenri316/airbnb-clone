import { ClientOnly } from "./components/ClientOnly";
import { ToasterProvider } from "./providers/ToasterProvider";
import { Navbar } from "./components/Navbar";
import { RegisterModal } from "./components/RegisterModal";
import { RentModal } from "./components/RentModal";
import { LoginModal } from "./components/LoginModal";
import { Nunito } from "next/font/google";
import getCurrentUser from "./actions/getCurrentUser";
import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RentModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
