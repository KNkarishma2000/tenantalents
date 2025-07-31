#!/bin/bash
set -e

echo "🚀 Creating multiple databases: $POSTGRES_MULTIPLE_DATABASES"
IFS=',' read -ra DBS <<< "$POSTGRES_MULTIPLE_DATABASES"
for db in "${DBS[@]}"; do
  echo "📦 Creating database: $db"
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE "$db";
EOSQL
done

echo "✅ All databases created!"
