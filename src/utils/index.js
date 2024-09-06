export function currentYear() {
    return new Date().getUTCFullYear()
}

export const API_URL = 'http://localhost:3000'

export function formattedDate(dateString) {
    if (!dateString || typeof dateString !== 'string') {
        throw new Error('Invalid date string');
    }
    
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${day}-${month}-${year}`;
}


  