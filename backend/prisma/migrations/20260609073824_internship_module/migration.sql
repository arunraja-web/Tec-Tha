-- CreateTable
CREATE TABLE "InternshipApplication" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "internshipRole" TEXT NOT NULL,
    "skills" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "resumeUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InternshipApplication_pkey" PRIMARY KEY ("id")
);
