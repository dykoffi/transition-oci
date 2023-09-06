-- CreateTable
CREATE TABLE "file_user" (
    "id" TEXT NOT NULL,
    "file_etag" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "file_user_pkey" PRIMARY KEY ("id")
);
