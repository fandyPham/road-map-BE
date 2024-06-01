/*
  Warnings:

  - The `expired_at` column on the `session` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "session" DROP COLUMN "expired_at",
ADD COLUMN     "expired_at" TIMESTAMP(3);
