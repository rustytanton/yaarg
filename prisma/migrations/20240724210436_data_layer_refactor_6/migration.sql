-- AlterTable
ALTER TABLE "ResumeJobExperienceSkill" ADD COLUMN     "userId" TEXT;

-- Populate new userID column before running next migration to add foreign key constraint
UPDATE "ResumeJobExperienceSkill" SET "userId" = (SELECT "userId" FROM "ResumeJobExperience" WHERE "ResumeJobExperience".id = "jobExperienceId" LIMIT 1)