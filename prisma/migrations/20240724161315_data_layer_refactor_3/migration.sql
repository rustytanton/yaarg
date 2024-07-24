/*
  Warnings:

  - Made the column `userId` on table `JobDescriptionSkill` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "JobDescriptionSkill" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "JobDescriptionSkill" ADD CONSTRAINT "JobDescriptionSkill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
