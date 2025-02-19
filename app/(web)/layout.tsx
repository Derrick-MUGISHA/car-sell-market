import NavBar from "@/components/NavBar";
import RegisterDialog from "./_components/auth/RegisterDialog";
import LogicDialog from "./_components/auth/LoginDialog";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import LoginDialog from "./_components/auth/LoginDialog";

export default function webLayout({
    children
}: Readonly <{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col w-full h-auto">
          
             <NavBar />
             <NuqsAdapter>
                  <RegisterDialog />
                  <LoginDialog />
                {children}
                </NuqsAdapter>
        </div>
       
    );
}