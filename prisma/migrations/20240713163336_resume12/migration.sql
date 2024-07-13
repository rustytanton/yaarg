-- CreateTable
CREATE TABLE "ResumeSummarySuggestion" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "suggestion" TEXT NOT NULL,

    CONSTRAINT "ResumeSummarySuggestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResumeSummarySuggestion" ADD CONSTRAINT "ResumeSummarySuggestion_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
