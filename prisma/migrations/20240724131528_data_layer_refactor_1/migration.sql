/*
  Warnings:

  - Added the required column `userId` to the `ChatGptAsyncJob` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatGptAsyncJob" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ChatGptAsyncJob" ADD CONSTRAINT "ChatGptAsyncJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
