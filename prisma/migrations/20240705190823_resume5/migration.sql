-- CreateTable
CREATE TABLE "ResumeJobExperience" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "ResumeJobExperience_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResumeJobExperience" ADD CONSTRAINT "ResumeJobExperience_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeJobExperience" ADD CONSTRAINT "ResumeJobExperience_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
