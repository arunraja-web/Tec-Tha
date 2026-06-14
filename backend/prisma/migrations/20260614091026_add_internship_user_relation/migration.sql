-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'SELECTED', 'REJECTED');

-- AlterTable
ALTER TABLE "InternshipApplication" ADD COLUMN     "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "InternshipApplication" ADD CONSTRAINT "InternshipApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
