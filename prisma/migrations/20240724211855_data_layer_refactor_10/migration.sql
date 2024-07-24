-- AlterTable
ALTER TABLE "ResumeSummarySuggestion" ADD COLUMN     "userId" TEXT;

-- Populate new userID column before running next migration to add foreign key constraint
UPDATE "ResumeSummarySuggestion" SET "userId" = (SELECT "userId" FROM "Resume" WHERE "Resume".id = "resumeId" LIMIT 1)