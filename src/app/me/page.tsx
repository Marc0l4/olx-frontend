'use client'

import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { UserContext } from "@/Contexts/UserContext";
import { haveCookie } from "@/helpers/authHandler";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const Page = () => {
    const router = useRouter();
    const ctx = useContext(UserContext)

    if (!ctx) return false;
    if (!ctx.token) return router.push('/user/signin');

    return (
        <PageContainer>
            <PageTitle title='Pagina Minha Conta' />
        </PageContainer>
    );
}

export default Page;