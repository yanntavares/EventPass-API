/*
  Warnings:

  - The `status` column on the `Events` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "Events" DROP COLUMN "status",
ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'SCHEDULED';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "Status";
