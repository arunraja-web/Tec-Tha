-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('OPEN', 'ADMIN_REPLIED', 'USER_DELETED');

-- CreateEnum
CREATE TYPE "SenderType" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "ContactConversation" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "status" "ContactStatus" NOT NULL DEFAULT 'OPEN',
    "deletedByUser" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactConversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" SERIAL NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "senderType" "SenderType" NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContactConversation" ADD CONSTRAINT "ContactConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactMessage" ADD CONSTRAINT "ContactMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "ContactConversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
