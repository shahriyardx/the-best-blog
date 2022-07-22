-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "comment_id" TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
