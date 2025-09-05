export const Footer = () => {
    return (
        <footer className="bg-black border-t border-gray-800 py-8 mt-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text- text-sm font-medium">
                        &copy; {new Date().getFullYear()} Jacob Wei. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}