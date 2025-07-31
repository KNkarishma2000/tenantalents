-- CreateEnum
CREATE TYPE "RatingTargetType" AS ENUM ('PRODUCT', 'SELLER');

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "targetType" "RatingTargetType" NOT NULL,
    "stars" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Rating_userId_idx" ON "Rating"("userId");

-- CreateIndex
CREATE INDEX "Rating_targetId_idx" ON "Rating"("targetId");

-- CreateIndex
CREATE INDEX "Rating_targetType_idx" ON "Rating"("targetType");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_targetId_targetType_key" ON "Rating"("userId", "targetId", "targetType");
