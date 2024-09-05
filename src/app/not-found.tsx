import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex gap-3 flex-col justify-center items-center">
            <h1 className="mt-4 text-5xl font-bold">404</h1>
            <div className="">
                <p className="text-center">não conseguimos encontrar essa página!</p>
                <span className="">Clique aqui para ser redirecionado a Pagina Inicial</span>
            </div>
            <Link className="mb-4 rounded-md text-white bg-orange-500 py-1 px-3 hover:bg-orange-600" href='/'>Ir para Pagina Inicial</Link>
        </div>
    );
}

export default NotFound;