-- CreateTable
CREATE TABLE `Customers` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Customers_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sales` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Sales_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentMethods` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PaymentMethods_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,

    UNIQUE INDEX `Products_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionDetails` (
    `id` CHAR(36) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `transaction_header_id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,

    UNIQUE INDEX `TransactionDetails_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionHeaders` (
    `id` CHAR(36) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `salesId` VARCHAR(191) NOT NULL,
    `payment_method_id` VARCHAR(191) NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TransactionHeaders_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TransactionDetails` ADD CONSTRAINT `TransactionDetails_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionDetails` ADD CONSTRAINT `TransactionDetails_transaction_header_id_fkey` FOREIGN KEY (`transaction_header_id`) REFERENCES `TransactionHeaders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionHeaders` ADD CONSTRAINT `TransactionHeaders_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionHeaders` ADD CONSTRAINT `TransactionHeaders_salesId_fkey` FOREIGN KEY (`salesId`) REFERENCES `Sales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionHeaders` ADD CONSTRAINT `TransactionHeaders_payment_method_id_fkey` FOREIGN KEY (`payment_method_id`) REFERENCES `PaymentMethods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
