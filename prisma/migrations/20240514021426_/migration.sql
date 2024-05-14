-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "descrption" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "visits" INTEGER NOT NULL DEFAULT 0,
    "submissions" INTEGER NOT NULL DEFAULT 0,
    "shareURL" TEXT NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "formSubmiision" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "formId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "formSubmiision_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "formSubmiision" ADD CONSTRAINT "formSubmiision_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
