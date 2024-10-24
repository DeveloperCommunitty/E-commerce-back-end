-- AlterTable
ALTER TABLE "products" ADD COLUMN     "lock_duration" INTEGER,
ADD COLUMN     "locked_at" TIMESTAMP(3);
