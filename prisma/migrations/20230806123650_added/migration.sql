/*
  Warnings:

  - You are about to drop the column `status` on the `Application` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('sent', 'opened', 'answered', 'rejected');

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "status",
ADD COLUMN     "feedbackMsg" TEXT,
ADD COLUMN     "hasFeedback" BOOLEAN,
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "statusId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "name" "status" NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
