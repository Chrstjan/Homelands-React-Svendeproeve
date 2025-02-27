export const cleanDescriptionText = (text) => {
    return text.replace(/EJENDOM:\s*|\nINDRETNING:\s*/g, '').trim();
   }