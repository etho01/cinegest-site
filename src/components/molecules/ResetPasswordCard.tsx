interface ResetPasswordCardProps {
    children: React.ReactNode;
}

export default function ResetPasswordCard({ children }: ResetPasswordCardProps) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-gray-800/50 border border-gray-700 rounded-lg shadow-xl p-8">
                {children}
            </div>
        </div>
    );
}
