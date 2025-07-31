✅ 1. Create all databases via init script
📁 Create an SQL init file at:

swift
Copy
Edit
infra/docker/init/multi-db-init.sql
Paste this content:

check list of db:

docker exec -it postgres-mvp psql -U mvp_ecom_user -d postgres -c "\l"


-- Auto-creates DBs for all microservices
CREATE DATABASE user_service_db;
CREATE DATABASE product_service_db;
CREATE DATABASE order_service_db;
CREATE DATABASE rating_service_db;
CREATE DATABASE email_service_db;
CREATE DATABASE payment_service_db;
CREATE DATABASE search_service_db;
CREATE DATABASE cart_service_db;
CREATE DATABASE admin_service_db;
CREATE DATABASE invoice_service_db;
CREATE DATABASE analytics_service_db;
CREATE DATABASE vendor_service_db;
Ensure your PostgreSQL Docker Compose mounts this:

yaml
Copy
Edit
volumes:
  - ./infra/docker/init:/docker-entrypoint-initdb.d
🧠 2. Quick psql connect commands
bash
Copy
Edit
# Format
docker exec -it postgres-mvp psql -U mvp_ecom_user -d <db_name>
Examples:

bash
Copy
Edit
docker exec -it postgres-mvp psql -U mvp_ecom_user -d user_service_db
docker exec -it postgres-mvp psql -U mvp_ecom_user -d order_service_db
📚 3. Inside psql commands
Action	Command
List all databases	\l
List all tables	\dt
Describe a table	\d table_name
View all users	\du
Quit psql	\q
Show current connection info	\conninfo

🛠 4. Create a table (example: users)
sql
Copy
Edit
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
💾 5. Backup and restore
Backup one service DB:

bash
Copy
Edit
docker exec -t postgres-mvp pg_dump -U mvp_ecom_user user_service_db > user_service_db.sql
Restore:

bash
Copy
Edit
cat user_service_db.sql | docker exec -i postgres-mvp psql -U mvp_ecom_user -d user_service_db
⚡ 6. Troubleshooting tips
Check logs:

bash
Copy
Edit
docker logs postgres-mvp
Enter PostgreSQL shell:

bash
Copy
Edit
docker exec -it postgres-mvp bash
Check DBs created:

bash
Copy
Edit
docker exec -it postgres-mvp psql -U mvp_ecom_user -c "\l"
🗂️ 7. PostgreSQL credentials in .env
Make sure these exist in your .env (already shown in yours):

env
Copy
Edit
POSTGRES_USER=mvp_ecom_user
POSTGRES_PASSWORD=mvp_ecom_pass
Optional (if used in Docker):

env
Copy
Edit
POSTGRES_MULTIPLE_DATABASES=user_service_db,product_service_db,...
Or just use init.sql as shown above.

