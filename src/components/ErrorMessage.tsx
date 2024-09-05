type Props = {
    error: string;
}

export const ErrorMessage = ({ error }: Props) => {
    return (
        <div className="max-w-sm m-auto text-center rounded-md text-2xl text-red-800 bg-red-200 border-2 border-red-600">
            {error}
        </div>
    );
}