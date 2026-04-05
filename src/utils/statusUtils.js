export const getStatusStyle = (status) => {
    switch (status) {
        case "PAID":
            return "bg-green-100 text-green-700";
        case "PLACED":
            return "bg-yellow-100 text-yellow-700";
        case "FAILED":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};