/*
  Warnings:

  - Added the required column `jobType` to the `ChatGptAsyncJob` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatGptAsyncJob" ADD COLUMN     "jobType" TEXT NOT NULL;
