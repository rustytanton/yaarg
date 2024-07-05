/*
  Warnings:

  - Added the required column `startDateParsed` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "startDateParsed" TIMESTAMP(3) NOT NULL;
