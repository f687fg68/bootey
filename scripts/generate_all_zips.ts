import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { fileURLToPath } from 'url';
import { TOOLKITS } from '../src/data/toolkitsData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const downloadsDir = path.join(rootDir, 'public', 'downloads');

if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

function createMockPdf(title: string, subtitle: string): string {
  return `%PDF-1.4
1 0 obj
<< /Title (${title})
   /Author (bootey Studio)
   /Subject (${subtitle})
   /Creator (bootey Studio Automated Publishing)
   /Producer (PDF-Core-v2)
   /CreationDate (D:20260921120000)
>>
endobj
2 0 obj
<< /Type /Catalog /Pages 3 0 R >>
endobj
3 0 obj
<< /Type /Pages /Kids [4 0 R] /Count 1 >>
endobj
4 0 obj
<< /Type /Page /Parent 3 0 R /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
5 0 obj
<< /Length 140 >>
stream
BT
/F1 18 Tf
50 720 Td
(${title}) Tj
/F1 11 Tf
0 -26 Td
(${subtitle}) Tj
0 -20 Td
(bootey(R) Verified Single-Seat Digital Delivery - Commercial License Included) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000210 00000 n 
0000000260 00000 n 
0000000320 00000 n 
0000000410 00000 n 
trailer
<< /Size 6 /Root 2 0 R /Info 1 0 R >>
startxref
590
%%EOF`;
}

function createSimpleCsv(title: string, desc: string): string {
  return `Category,Item_Name,Target_Value,Actual_Value,Status,Notes
Core,${title.replace(/,/g, ' ')},1000,1000,Active,"${desc.replace(/"/g, '""')}"
Metrics,Baseline Metric,500,520,Verified,Calculated automatically
Review,Quarterly Audit,0,0,Completed,Approved for production implementation
`;
}

async function buildAllZips() {
  console.log(`Starting generation for ${TOOLKITS.length} digital products...`);

  for (const toolkit of TOOLKITS) {
    const zip = new JSZip();
    const fileName = toolkit.zipFile.fileName;

    // 1. Readme
    const readmeContent = `======================================================================
bootey(R) DIGITAL TOOLKIT ARCHIVE
Product Code: ${toolkit.code}
Title: ${toolkit.title}
Subtitle: ${toolkit.subtitle}
Price: $${toolkit.price.toFixed(2)} USD
Archive: ${fileName}
Generated for: Verified Customer
======================================================================

PRODUCT SUMMARY:
${toolkit.description}

TABLE OF CONTENTS / MODULES:
${toolkit.tableOfContents.map((m, i) => `  [${i + 1}] ${m}`).join('\n')}

INCLUDED ASSET MANIFEST (${toolkit.zipFile.filesCount} files):
${toolkit.zipFile.manifest.map((item, i) => `  ${i + 1}. ${item.name} (${item.size}) - ${item.description}`).join('\n')}

LICENSING & USAGE:
This toolkit is protected by copyright and licensed under the bootey Single-Seat Lifetime Commercial License.
You may use, adapt, and implement all worksheets, spreadsheets, and guides for personal and business use.
Redistribution, reselling, or public uploading of raw files is prohibited.

SUPPORT & POLAR CHECKOUT FULFILLMENT:
For inquiries or licensing questions: support@bootey.com
https://bootey.com
`;
    zip.file('00_README_AND_MANIFEST.txt', readmeContent);

    // 2. License
    const licenseContent = `bootey(R) SINGLE-SEAT LIFETIME COMMERCIAL LICENSE
Product: ${toolkit.code} - ${toolkit.title}
Issued to: Verified Digital Purchaser
License Type: Commercial Single-Seat Perpetual

1. PERPETUAL GRANT:
The author grants you a worldwide, perpetual, royalty-free license to use, adapt,
and execute the materials contained in this toolkit.

2. COMMERCIAL APPLICATION:
You may use the systems, prompts, checklists, and spreadsheets in internal operations,
client deliverables, and personal projects.

3. POLAR CHECKOUT VERIFICATION:
This package corresponds to verified checkout order fulfillment for ${toolkit.code}.
`;
    zip.file('LICENSE_PERPETUAL.txt', licenseContent);

    // 3. Populate manifest files
    for (const item of toolkit.zipFile.manifest) {
      const lower = item.name.toLowerCase();
      if (lower.endsWith('.pdf')) {
        zip.file(item.name, createMockPdf(item.name.replace(/\.pdf$/, ''), `${toolkit.title} - ${item.description}`));
      } else if (lower.endsWith('.xlsx') || lower.endsWith('.csv')) {
        zip.file(item.name, createSimpleCsv(item.name, item.description));
      } else if (lower.endsWith('.url')) {
        zip.file(item.name, `[InternetShortcut]\nURL=https://notion.so/bootey-templates/${toolkit.id}\n`);
      } else if (lower.endsWith('.html')) {
        zip.file(item.name, `<!DOCTYPE html><html><head><title>${toolkit.title}</title><style>body{font-family:sans-serif;max-width:800px;margin:40px auto;padding:20px;line-height:1.6;}</style></head><body><h1>${toolkit.title}</h1><h2>${item.name}</h2><p>${item.description}</p><hr/><p>Official digital source template provided by bootey Studio.</p></body></html>`);
      } else {
        const textContent = `# ${item.name}
Toolkit: ${toolkit.code} - ${toolkit.title}
Asset: ${item.description}

============================================================
Official template and operational content ready for deployment.
`;
        zip.file(item.name, textContent);
      }
    }

    const buffer = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
    const destPath = path.join(downloadsDir, fileName);
    fs.writeFileSync(destPath, buffer);
  }

  console.log(`Successfully generated all ${TOOLKITS.length} ZIP packages in public/downloads/!`);
}

buildAllZips().catch(err => {
  console.error('Error generating all zips:', err);
  process.exit(1);
});
