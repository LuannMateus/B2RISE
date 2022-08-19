-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(30) NOT NULL,
    "price" DECIMAL(11,2) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "image" VARCHAR(200) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
