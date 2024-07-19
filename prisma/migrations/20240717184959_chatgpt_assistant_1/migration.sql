-- CreateTable
CREATE TABLE "ChatGptAsyncJob" (
    "id" SERIAL NOT NULL,
    "assistantId" INTEGER NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "runId" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,

    CONSTRAINT "ChatGptAsyncJob_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChatGptAsyncJob" ADD CONSTRAINT "ChatGptAsyncJob_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatGptAsyncJob" ADD CONSTRAINT "ChatGptAsyncJob_assistantId_fkey" FOREIGN KEY ("assistantId") REFERENCES "ChatGptAssistant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
