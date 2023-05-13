import { ClientOnly } from "./components/ClientOnly";
import { Navbar } from "./components/Navbar";
import { RegisterModal } from "./components/RegisterModal";
import { Nunito } from "next/font/google";
import { ToasterProvider } from "./providers/ToasterProvider";
import { LoginModal } from "./components/LoginModal";
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
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
