import { ReactNode } from "react";

export const Template = ({ children }: { children: ReactNode }) => {
    return (
        <div className="">
            {children}
        </div>
    );
}