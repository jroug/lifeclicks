import { convertToTitleCase } from "@/utils/convertToTitleCase";

export const buildHeadTitle = (frm: string, str: string  ): string  => {
    let s = '';
    if (frm === 'films' )
         s = str.replaceAll('videos/','/films');
    else if (frm === 'project' )
         s = str.replaceAll('-',' & ');
    else
        s = str.replaceAll('-',' ');
    let s2 = s.replaceAll('  ',' ');
    return 'Lifeclicks Studio - ' + convertToTitleCase(s2);
} 