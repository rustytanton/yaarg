-- CreateTable
CREATE TABLE "JobDescriptionSkill" (
    "id" SERIAL NOT NULL,
    "jobDescriptionId" INTEGER NOT NULL,
    "skill" TEXT NOT NULL,
    "mentions" INTEGER NOT NULL,

    CONSTRAINT "JobDescriptionSkill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobDescriptionSkill" ADD CONSTRAINT "JobDescriptionSkill_jobDescriptionId_fkey" FOREIGN KEY ("jobDescriptionId") REFERENCES "JobDescription"("id") ON DELETE CASCADE ON UPDATE CASCADE;
