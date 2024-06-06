-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "institution" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "minor" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "graduated" BOOLEAN NOT NULL,
    "gpa" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);
