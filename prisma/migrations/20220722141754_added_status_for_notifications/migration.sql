/*
  Warnings:

  - You are about to drop the column `comment_id` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Notification` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('READ', 'UNREAD');

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_post_id_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "comment_id",
DROP COLUMN "updated_at",
ADD COLUMN     "status" "NotificationStatus" NOT NULL DEFAULT 'UNREAD';
