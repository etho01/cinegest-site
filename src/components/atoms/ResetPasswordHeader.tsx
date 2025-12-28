interface ResetPasswordHeaderProps {
    title: string;
    description: string;
}

export default function ResetPasswordHeader({ title, description }: ResetPasswordHeaderProps) {
    return (
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
                {title}
            </h1>
            <div className="h-1 w-20 bg-red-600 rounded mx-auto mb-4"></div>
            <p className="text-gray-300">
                {description}
            </p>
        </div>
    );
}
