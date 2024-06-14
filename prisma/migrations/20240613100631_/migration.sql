/*
  Warnings:

  - You are about to drop the `formSubmiision` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "formSubmiision" DROP CONSTRAINT "formSubmiision_formId_fkey";

-- DropTable
DROP TABLE "formSubmiision";

-- CreateTable
CREATE TABLE "formSubmission" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "formId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "formSubmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "formSubmission" ADD CONSTRAINT "formSubmission_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
