/*
  Warnings:

  - Made the column `userId` on table `ResumeJobExperienceSugggestion` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ResumeJobExperienceSugggestion" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ResumeJobExperienceSugggestion" ADD CONSTRAINT "ResumeJobExperienceSugggestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
