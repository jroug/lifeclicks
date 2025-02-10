import { convertToTitleCase } from "@/utils/convertToTitleCase";

export const buildHeadTitle = (str: string): string  => {
    let s = str.replaceAll('-',' ');
    let s2 = s.replaceAll('  ',' ');
    return 'Lifeclicks Studio - ' + convertToTitleCase(s);
} 