/*
  Warnings:

  - Added the required column `created_at` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `created_at` DATE NOT NULL,
    ADD COLUMN `foto` VARCHAR(200) NULL,
    ADD COLUMN `updated_at` DATE NULL;
