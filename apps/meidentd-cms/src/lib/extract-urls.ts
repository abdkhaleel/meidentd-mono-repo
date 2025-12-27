export function extractUrlsFromContent(contentJsonString: string): string[] {
  try {
    if (!contentJsonString || typeof contentJsonString !== 'string') return [];

    let content;
    try {
        content = JSON.parse(contentJsonString);
    } catch (e) {
        return []; 
    }

    const foundUrls: string[] = [];

    const traverse = (node: any) => {
      if ((node.type === 'image' || node.type === 'iframe') && node.attrs?.src) {
        foundUrls.push(node.attrs.src);
      }
      if (node.type === 'attachment' && node.attrs?.src) {
        foundUrls.push(node.attrs.src);
      }
      
      if (node.content && Array.isArray(node.content)) {
        node.content.forEach(traverse);
      }
    };

    if (content.type === 'doc') {
      traverse(content);
    }

    return foundUrls;
  } catch (error) {
    console.error("Error extracting URLs:", error);
    return [];
  }
}