-- CreateTable
CREATE TABLE "ChatGptAssistant" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "model" TEXT NOT NULL,

    CONSTRAINT "ChatGptAssistant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChatGptAssistant" ADD CONSTRAINT "ChatGptAssistant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
