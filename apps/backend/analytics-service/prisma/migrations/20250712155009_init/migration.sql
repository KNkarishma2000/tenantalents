/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `metrics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "metrics_type_key" ON "metrics"("type");
