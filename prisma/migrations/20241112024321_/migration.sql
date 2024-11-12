-- CreateEnum
CREATE TYPE "ProductCategories" AS ENUM ('RECOMENDADOS', 'MAIS_VENDIDOS', 'MAIS_PROCURADOS');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "category" "ProductCategories" NOT NULL DEFAULT 'RECOMENDADOS';
