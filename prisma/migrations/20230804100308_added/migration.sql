-- CreateEnum
CREATE TYPE "Status" AS ENUM ('sent', 'opened', 'answered', 'rejected');

-- CreateTable
CREATE TABLE "SearchPlatform" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "SearchPlatform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "searchPlatformId" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_searchPlatformId_fkey" FOREIGN KEY ("searchPlatformId") REFERENCES "SearchPlatform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
