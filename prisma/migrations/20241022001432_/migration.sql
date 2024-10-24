-- CreateEnum
CREATE TYPE "StatusEstoque" AS ENUM ('DISPONIVEL', 'ESGOTADO');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "status_estoque" "StatusEstoque" NOT NULL DEFAULT 'DISPONIVEL';
