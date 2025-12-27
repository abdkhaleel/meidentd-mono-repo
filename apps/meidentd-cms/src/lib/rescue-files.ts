import { prisma } from '@/lib/prisma';

export async function rescueFilesFromContent(contentJsonString: string) {
  try {
    const content = JSON.parse(contentJsonString);
    const urlsToRescue: string[] = [];

    const findUrls = (node: any) => {
      if ((node.type === 'image' || node.type === 'iframe') && node.attrs?.src) {
        urlsToRescue.push(node.attrs.src);
      }
      if (node.type === 'attachment' && node.attrs?.src) {
        urlsToRescue.push(node.attrs.src);
      }
      if (node.content && Array.isArray(node.content)) {
        node.content.forEach(findUrls);
      }
    };

    if (content.type === 'doc') {
      findUrls(content);
    }

    if (urlsToRescue.length > 0) {
      await prisma.pendingUpload.deleteMany({
        where: {
          fileUrl: { in: urlsToRescue }
        }
      });
      console.log(`Rescued ${urlsToRescue.length} files from deletion.`);
    }
  } catch (e) {
    
  }
}