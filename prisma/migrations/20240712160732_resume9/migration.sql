-- CreateTable
CREATE TABLE "ResumeJobExperienceSkill" (
    "id" SERIAL NOT NULL,
    "jobExperienceId" INTEGER NOT NULL,
    "skill" TEXT NOT NULL,

    CONSTRAINT "ResumeJobExperienceSkill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResumeJobExperienceSkill" ADD CONSTRAINT "ResumeJobExperienceSkill_jobExperienceId_fkey" FOREIGN KEY ("jobExperienceId") REFERENCES "ResumeJobExperience"("id") ON DELETE CASCADE ON UPDATE CASCADE;
