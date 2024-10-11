/*
  Warnings:

  - You are about to drop the column `avatarId` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatarId",
ADD COLUMN     "avatar_id" TEXT;
