/*
  Warnings:

  - You are about to drop the column `author_id` on the `Like` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_author_id_fkey";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "author_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
