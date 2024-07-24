-- AlterTable
ALTER TABLE "ResumeJobExperience" ADD COLUMN     "userId" TEXT;

-- Populate new userID column before running next migration to add foreign key constraint
UPDATE "ResumeJobExperience" SET "userId" = (SELECT "userId" FROM "Resume" WHERE "Resume".id = "resumeId" LIMIT 1)