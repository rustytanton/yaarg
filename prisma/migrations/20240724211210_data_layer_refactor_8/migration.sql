-- AlterTable
ALTER TABLE "ResumeJobExperienceSugggestion" ADD COLUMN     "userId" TEXT;

-- Populate new userID column before running next migration to add foreign key constraint
UPDATE "ResumeJobExperienceSugggestion" SET "userId" = (SELECT "userId" FROM "ResumeJobExperience" WHERE "ResumeJobExperience".id = "jobExperienceId" LIMIT 1)