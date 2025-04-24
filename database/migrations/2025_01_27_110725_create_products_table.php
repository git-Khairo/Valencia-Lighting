<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('title');
            $table->string('image');
            $table->string('brand');
            $table->string('material');
            $table->string('productNumber');
            $table->string('length');
            $table->string('color');
            $table->string('accessories');
            $table->text('description');
            $table->date('dateOfRelease');
            $table->string('code')->unique();
            $table->string('datasheet')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};