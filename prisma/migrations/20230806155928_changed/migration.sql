/*
  Warnings:

  - You are about to drop the column `statusId` on the `Application` table. All the data in the column will be lost.
  - Added the required column `statusName` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_statusId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "statusId",
ADD COLUMN     "statusName" "status" NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_statusName_fkey" FOREIGN KEY ("statusName") REFERENCES "Status"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
