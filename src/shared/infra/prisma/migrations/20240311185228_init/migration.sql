-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(80) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,
    `dt_nascimento` DATE NOT NULL,
    `resetToken` VARCHAR(200) NULL,
    `foto` VARCHAR(200) NULL,
    `created_at` DATETIME NULL,
    `updated_at` DATETIME NULL,
    `updatedSenha_at` DATETIME NULL,

    UNIQUE INDEX `user_cpf_key`(`cpf`),
    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `backList` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
