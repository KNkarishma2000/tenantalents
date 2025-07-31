🪣 @shared/minio — MinIO Utility Library
This library helps you upload, download, and manage files (like PDFs, images, attachments) in MinIO — a file storage server that works like AWS S3.

It is used in services like:

product-service (for product images),

email-service (for attachments),

invoice-service (for PDF invoices),

and more...

You can use this library to avoid writing the same upload/download code again in every service.

✨ What This Library Does
✅ Connects to MinIO using credentials
✅ Uploads files to the correct folder (bucket)
✅ Creates a download link (presigned URL)
✅ Automatically creates a bucket if it doesn’t exist
✅ Gives you helper tools to name files and organize folders

🗂 Folder Structure
pgsql
Copy
Edit
libs/shared/minio/
├── lib/
│ ├── minio-client.ts # Sets up the connection to MinIO
│ ├── minio.ts # Upload logic
│ ├── get-presigned-url.util.ts# Generates download links
│ ├── generate-filename.util.ts# Makes unique file names (using UUID)
│ ├── generate-path.util.ts # Combines folder + file name into one path
│ ├── minio-constants.ts # Lists all folders and file types
│ ├── minio-utils.ts # Other helpers (check if bucket exists, get file, etc.)
│ ├── bucket.ts # Simple list of bucket names
│ └── minio-types.ts # TypeScript types for function inputs
⚙️ .env Setup (Example)
Before using the library, add this to your .env:

env
Copy
Edit
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=minio
MINIO_SECRET_KEY=minio123
🧪 How to Use
✅ Upload a file
ts
Copy
Edit
import { uploadFileToMinIO } from '@shared/minio';

await uploadFileToMinIO({
bucketName: 'product-files',
objectName: 'products/images/image-123.jpg', // folder + file
content: buffer, // file content (as Buffer)
contentType: 'image/jpeg', // example: image/jpeg, application/pdf
});
🔗 Create a Download Link (Presigned URL)
ts
Copy
Edit
import { getPresignedUrl } from '@shared/minio';

const url = await getPresignedUrl({
bucketName: 'product-files',
objectName: 'products/images/image-123.jpg',
});

console.log('Download URL:', url);
📁 Create a Bucket (if it doesn't exist)
ts
Copy
Edit
import { ensureBucketExists } from '@shared/minio';

await ensureBucketExists('product-files');
🧠 Tips for Beginners
✅ Use generateFilename(prefix, extension) to make sure your file name is unique.

Example:

ts
Copy
Edit
const filename = generateFilename('invoice', '.pdf');
✅ Use folders from MinioFolderPaths to organize files.

Example:

ts
Copy
Edit
const objectPath = generateObjectPath('invoices/pdf/', filename);
✅ Always upload files inside the correct bucket + folder.

🪣 Common Buckets
These are the storage areas (called “buckets”) used across services:

Bucket Name Used For
product-files Product images
invoice-files Invoice PDFs
email-files Email attachments
user-files User profile images or docs
vendor-files Vendor KYC documents
cms-files Static files for CMS

📂 Common Folder Paths
Folders inside buckets (called “virtual directories”):

ts
Copy
Edit
MinioFolderPaths = {
USER_AVATARS: 'users/avatars/',
INVOICE_PDFS: 'invoices/pdf/',
PRODUCT_IMAGES: 'products/images/',
EMAIL_ATTACHMENTS: 'emails/attachments/',
};
📦 File Types (MIME Types)
ts
Copy
Edit
MimeTypes = {
JPEG: 'image/jpeg',
PDF: 'application/pdf',
DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
ZIP: 'application/zip',
};
🐳 Run MinIO Locally (For Dev & Testing)
bash
Copy
Edit
docker run -p 9000:9000 -p 9001:9001 \
 -e MINIO_ROOT_USER=minio \
 -e MINIO_ROOT_PASSWORD=minio123 \
 quay.io/minio/minio server /data --console-address ":9001"
Go to: http://localhost:9001

Login with:

Username: minio

Password: minio123

📥 Bonus: Install mc CLI (MinIO Client)
bash
Copy
Edit
curl https://dl.min.io/client/mc/release/linux-amd64/mc -o mc
chmod +x mc
sudo mv mc /usr/local/bin/
Then connect to your local MinIO:

bash
Copy
Edit
mc alias set localminio http://localhost:9000 minio minio123
mc ls localminio
✅ Summary
What You Want to Do Use This Function
Upload a file uploadFileToMinIO()
Create download URL getPresignedUrl()
Make sure bucket exists ensureBucketExists()
Make a unique file name generateFilename()
Join folder + file into path generateObjectPath()
