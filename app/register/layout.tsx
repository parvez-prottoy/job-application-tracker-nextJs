import type { Metadata } from 'next';  
export const metadata: Metadata = {  
  title: 'Sign Up | CareerFlow',  
  description: 'Create your CareerFlow account and start tracking your job applications.',  
};  
export default function RegisterLayout({  
  children,  
}: {  
  children: React.ReactNode;  
}) {  
  return <>{children}</>;  
} 
