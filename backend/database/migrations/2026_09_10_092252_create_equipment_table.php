<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('equipment', function (Blueprint $table) {
            $table->id();
            $table->string('name');

            $table->string('serial_number')->nullable()->unique();

            $table->string('category')->nullable();

            $table->date('purchase_date')->nullable();

            $table->enum('status', [
                'available',
                'in_use',
                'maintenance',
                'out_of_service',
            ])->default('available');

            $table->string('location')->nullable();

            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment');
    }
};
