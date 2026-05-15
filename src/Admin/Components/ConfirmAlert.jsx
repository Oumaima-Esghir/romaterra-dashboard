function ConfirmAlert(title, message, onConfirm, onCancel) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-2 text-lg font-semibold text-gray-900">{title}</h2>
                <p className="mb-6 text-sm text-gray-600">{message}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="rounded-md border px-4 py-2 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmAlert;