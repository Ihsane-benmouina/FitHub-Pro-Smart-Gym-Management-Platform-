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
        Schema::create('program_exercise', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('exercise_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->unsignedInteger('sets')->nullable();

            $table->unsignedInteger('reps')->nullable();

            $table->unsignedInteger('duration_seconds')->nullable();

            $table->decimal('weight', 6, 2)->nullable();

            $table->unsignedInteger('rest_seconds')->nullable();

            $table->text('instructions')->nullable();

            $table->timestamps();

            $table->unique(['program_id', 'exercise_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('program_exercise');
    }
};
