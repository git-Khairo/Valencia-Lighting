<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('products_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');  // Foreign key to orders table
            $table->foreignId('product_id')->constrained()->onDelete('cascade');  // Foreign key to products table
            $table->integer('quantity');  // Quantity of the product in the order
            $table->timestamps();

            // Unique constraint to ensure each product in the order is unique
            $table->unique(['order_id', 'product_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('products_orders');
    }
};