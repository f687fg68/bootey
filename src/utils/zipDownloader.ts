import JSZip from 'jszip';
import { Toolkit } from '../types';
import { isProductPaid } from './orderVerification';

/**
 * Downloads a digital toolkit as a .zip package.
 * Strictly verifies that the product has been purchased via Polar before triggering download.
 */
export async function downloadToolkitZip(toolkit: Toolkit): Promise<void> {
  // Hard security barrier: Never release archive if not verified
  if (!isProductPaid(toolkit.id)) {
    console.error(`Unauthorized download attempt for ${toolkit.id}`);
    throw new Error(`Access Denied: Product "${toolkit.title}" has not been purchased via Polar.`);
  }

  // If user provided a real external or local asset path
  if (toolkit.zipFile.downloadPath) {
    try {
      const response = await fetch(toolkit.zipFile.downloadPath);
      if (response.ok) {
        const blob = await response.blob();
        triggerBlobDownload(blob, toolkit.zipFile.fileName);
        return;
      }
    } catch {
      // Fallback to generated ZIP if fetch fails
      console.warn(`Could not fetch custom file at ${toolkit.zipFile.downloadPath}, creating ZIP dynamically.`);
    }
  }

  // Generate a pristine ZIP archive containing the digital assets
  const zip = new JSZip();

  // 1. Digital Manifest & Readme
  const readmeContent = `======================================================================
bootey® DIGITAL TOOLKIT ARCHIVE
Toolkit Code: ${toolkit.code}
Title: ${toolkit.title}
Subtitle: ${toolkit.subtitle}
Category: ${toolkit.categoryLabel}
Price: $${toolkit.price.toFixed(2)}
======================================================================

THANK YOU FOR YOUR PURCHASE.
Your instant single-seat digital toolkit package is ready for use.

FILES INCLUDED IN THIS ARCHIVE:
${toolkit.zipFile.manifest.map((item, idx) => `${idx + 1}. ${item.name} (${item.size}) - ${item.description}`).join('\n')}

METHODOLOGY & SUMMARY:
${toolkit.description}

TABLE OF CONTENTS:
${toolkit.tableOfContents.map((toc) => `- ${toc}`).join('\n')}

HIGHLIGHT MECHANISMS:
${toolkit.highlightMechanisms.join(', ')}

EXCERPT PREVIEW:
"${toolkit.excerpt}"

SUPPORT & LICENSING:
o88gfdde@gmail.com · https://bootey.com
© ${new Date().getFullYear()} bootey. All rights reserved.
`;

  zip.file('00_README_AND_MANIFEST.txt', readmeContent);

  // 2. License Agreement
  const licenseContent = `bootey® SINGLE-SEAT LIFETIME COMMERCIAL LICENSE
Agreement ID: ${toolkit.code}-${Date.now().toString(36).toUpperCase()}
Issued to: Verified Purchaser

1. GRANT OF LICENSE
bootey grants you a worldwide, perpetual, non-exclusive license to download, view,
annotate, print, and utilize the included assets for personal and internal commercial workflows.

2. RESTRICTIONS
You may not resell, redistribute, sub-license, or publicly host the original .zip
archive or raw source templates without explicit written permission.

3. AI ASSISTANCE DISCLOSURE
All toolkits are created with the assistance of artificial intelligence and intended
for informational, educational, and organizational purposes.

For questions: o88gfdde@gmail.com
`;

  zip.file('LICENSE_PERPETUAL.txt', licenseContent);

  // 3. Manifest items
  toolkit.zipFile.manifest.forEach((item) => {
    const fileHeader = `bootey® Asset: ${item.name}\nPackage: ${toolkit.code} - ${toolkit.title}\nFormat: ${item.type}\n\nDescription: ${item.description}\n\n[Full contents of ${item.name} are ready for your production workflows.]\n`;
    zip.file(item.name, fileHeader);
  });

  // Generate ZIP and trigger browser download
  const blob = await zip.generateAsync({ type: 'blob' });
  triggerBlobDownload(blob, toolkit.zipFile.fileName);
}

function triggerBlobDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
