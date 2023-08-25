-- DropForeignKey
ALTER TABLE "ApplicationStatusUpdate" DROP CONSTRAINT "ApplicationStatusUpdate_applicationId_fkey";

-- AddForeignKey
ALTER TABLE "ApplicationStatusUpdate" ADD CONSTRAINT "ApplicationStatusUpdate_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
