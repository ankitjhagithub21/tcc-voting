const Loading = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white p-5">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-white border-opacity-50"></div>
                <h1 className="text-3xl font-bold mt-6">Loading...</h1>
                <p className="text-lg mt-2">Please wait while we load the content for you.</p>
            </div>
        </div>
    );
};

export default Loading;
