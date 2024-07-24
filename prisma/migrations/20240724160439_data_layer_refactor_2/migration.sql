-- AlterTable
ALTER TABLE "JobDescriptionSkill" ADD COLUMN     "userId" TEXT;

-- Populate new userID column before running next migration to add foreign key constraint
UPDATE "JobDescriptionSkill" SET "userId" = (SELECT "userId" FROM "JobDescription" WHERE "JobDescription".id = "jobDescriptionId" LIMIT 1)