import { convertToTitleCase } from "@/utils/convertToTitleCase";

export const buildHeadTitle = (str: string): string  => {
    return 'Lifeclicks Studio - ' + convertToTitleCase(str);
} 