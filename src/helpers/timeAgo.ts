export const  timeAgo = (dateString: string): string  => {
    const date = new Date(dateString);
    const now = new Date();
    const secondsDiff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (secondsDiff < 60) {
        return `${secondsDiff} seg`;
    } else if (secondsDiff < 3600) {
        const minutes = Math.floor(secondsDiff / 60);
        return `${minutes} min`;
    } else if (secondsDiff < 86400) {
        const hours = Math.floor(secondsDiff / 3600);
        return `${hours} hor`;
    } else if (secondsDiff < 604800) {
        const days = Math.floor(secondsDiff / 86400);
        return `${days} días`;
    } else if (secondsDiff < 2592000) {
        const weeks = Math.floor(secondsDiff / 604800);
        return `${weeks} Sem`;
    } else {
        const months = Math.floor(secondsDiff / 2592000);
        return `${months} M`;
    }
}