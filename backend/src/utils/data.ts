export default function converteDate(date: Date | string): string {
    if (!date) return ""

    const nDate = new Date(date);
   
    if (nDate.getMonth() < 9) {
        return `${String(nDate.getDate()).padStart(2, '0')}-0${nDate.getMonth() + 1}-${nDate.getFullYear()}`;
    } else {
        return `${String(nDate.getDate()).padStart(2, '0')}-${nDate.getMonth() + 1}-${nDate.getFullYear()}`;
    }
    
}