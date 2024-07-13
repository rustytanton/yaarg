-- CreateTable
CREATE TABLE "ResumeJobExperienceSugggestion" (
    "id" SERIAL NOT NULL,
    "jobExperienceId" INTEGER NOT NULL,
    "suggestion" TEXT NOT NULL,

    CONSTRAINT "ResumeJobExperienceSugggestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResumeJobExperienceSugggestion" ADD CONSTRAINT "ResumeJobExperienceSugggestion_jobExperienceId_fkey" FOREIGN KEY ("jobExperienceId") REFERENCES "ResumeJobExperience"("id") ON DELETE CASCADE ON UPDATE CASCADE;
