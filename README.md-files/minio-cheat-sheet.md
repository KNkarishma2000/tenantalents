# 🧾 MINIO CLI CHEAT SHEET (mc) — MVP E-Commerce

# 1️⃣ Install mc (MinIO Client)

# macOS

brew install minio/stable/mc

# Linux

curl -O https://dl.min.io/client/mc/release/linux-amd64/mc && chmod +x mc && sudo mv mc /usr/local/bin/mc

# 2️⃣ Connect to Local MinIO

mc alias set localminio http://localhost:9000 minio minio123

# 3️⃣ Bucket Management

mc ls localminio # List all buckets
mc mb localminio/product-files # Create bucket
mc rb localminio/invoice-files # Remove bucket
mc rb --force --recursive localminio/rating-files # Force remove with content

# 4️⃣ Upload / Download Files

mc cp ./image.jpg localminio/product-files/products/images/image.jpg # Upload file
mc cp --recursive ./images/ localminio/product-files/products/images/ # Upload folder
mc cp localminio/invoice-files/invoices/pdf/invoice.pdf ./ # Download file
mc rm localminio/email-files/emails/attachments/offer.pdf # Delete file

# 5️⃣ List / Stat

mc ls localminio/product-files/products/images/ # List objects in folder
mc ls --recursive localminio/product-files # List all files in bucket
mc stat localminio/user-files/users/avatars/avatar.jpg # Show metadata

# 6️⃣ Generate Presigned URL (expires in 1 hour)

mc alias generate --expiry 3600 localminio/product-files/products/images/product.jpg

# 7️⃣ Public Access (optional, not recommended for private data)

mc anonymous set download localminio/product-files # Make public read
mc anonymous set none localminio/product-files # Remove public access

# 8️⃣ Reset or Clean Bucket

mc rm --recursive --force localminio/product-files
mc mb localminio/product-files

# 9️⃣ Common Buckets Used in Project

# user-service ➜ user-files ➜ users/avatars/

# product-service ➜ product-files ➜ products/images/

# rating-service ➜ rating-files ➜ ratings/images/

# email-service ➜ email-files ➜ emails/attachments/

# invoice-service ➜ invoice-files ➜ invoices/pdf/
