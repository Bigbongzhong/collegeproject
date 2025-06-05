function Guidelines(prop) {
    return (
        <div className={prop.show ? "guidelines guidelinesShow" : "guidelines"}>
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8 border border-amber-200">
                <h1 className="text-3xl font-bold text-emerald-700 mb-4 text-center">Community Guidelines</h1>
                <p className="mb-6 text-gray-700 text-center text-xs">
                    Welcome to our dating website! We are committed to providing a safe and enjoyable experience for all our users. Please read the following guidelines carefully:
                </p>
                <div className="space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold text-amber-700 mb-1">1. Respect Others</h2>
                        <p className="text-gray-600">Treat all users with respect and kindness. Harassment, hate speech, or any form of discrimination will not be tolerated.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-amber-700 mb-1">2. Be Honest</h2>
                        <p className="text-gray-600">Provide accurate information in your profile and interactions. Honesty is key to building trust.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-amber-700 mb-1">3. Privacy Matters</h2>
                        <p className="text-gray-600">Protect your personal information and respect the privacy of others. Do not share personal details without consent.</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-amber-700 mb-1">4. Report Inappropriate Behavior</h2>
                        <p className="text-gray-600">If you encounter any inappropriate behavior, please report it to our support team immediately.</p>
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-emerald-700 mb-2">Prohibited Content</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>No nudity or sexually explicit content.</li>
                        <li>No hate speech, racism, sexism, or discrimination.</li>
                        <li>No harassment, threats, or bullying.</li>
                        <li>No promotion of illegal activities (e.g., drugs, weapons, etc.).</li>
                        <li>No spam, scams, or promotional links.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Guidelines;