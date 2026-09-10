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
        Schema::create('progress_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('member_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->foreignId('coach_id')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->date('recorded_at');

            $table->decimal('weight', 5, 2)->nullable();

            $table->decimal('height', 5, 2)->nullable();

            $table->decimal('body_fat_percentage', 5, 2)->nullable();

            $table->decimal('muscle_mass', 5, 2)->nullable();

            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('progress_records');
    }
};
