/*
  Warnings:

  - You are about to drop the column `created_date` on the `blog_comments` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `chat_message` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `chat_room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blog_comments" DROP COLUMN "created_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "chat_message" DROP COLUMN "created_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "chat_room" DROP COLUMN "created_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
