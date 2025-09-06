export const Footer = () => {
    return (
        <footer className="bg-black border-t border-black py-8 mt-16">
            <div className="max-w-4xl mx-auto px-3 sm:px-5 lg:px-7">
                <div className="text-center">
                    <p className="text- text-xs font-small">
                        &copy; {new Date().getFullYear()} Jacob Wei. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}