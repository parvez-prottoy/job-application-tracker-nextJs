import type { Metadata } from 'next';  
export const metadata: Metadata = {  
  title: 'Log In | CareerFlow',  
  description: 'Log in to your CareerFlow account to manage your job applications.',  
};  
export default function LoginLayout({  
  children,  
}: {  
  children: React.ReactNode;  
}) {  
  return <>{children}</>;  
} 
