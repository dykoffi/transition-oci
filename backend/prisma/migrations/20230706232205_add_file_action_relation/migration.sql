-- CreateTable
CREATE TABLE "FileAction" (
    "id" TEXT NOT NULL,
    "fileNAme" TEXT NOT NULL,
    "etag" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,

    CONSTRAINT "FileAction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FileAction" ADD CONSTRAINT "FileAction_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
