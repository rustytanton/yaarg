/*
  Warnings:

  - Made the column `userId` on table `ResumeJobExperience` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ResumeJobExperience" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ResumeJobExperience" ADD CONSTRAINT "ResumeJobExperience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
