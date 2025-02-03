export const convertToTitleCase = (str: string): string  => {
    if ( str === 'F.A.Q.' ) return str;
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}