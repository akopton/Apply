/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `SearchPlatform` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SearchPlatform_url_key" ON "SearchPlatform"("url");
