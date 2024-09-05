import { ReactNode } from "react";

export const PageContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className="container mx-auto py-3">
            {children}
        </div>
    );
}