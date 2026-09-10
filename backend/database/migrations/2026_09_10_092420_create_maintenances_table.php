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
        Schema::create('maintenances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equipment_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('reported_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->text('description');

            $table->enum('type', [
                'preventive',
                'corrective',
            ])->default('corrective');

            $table->enum('status', [
                'pending',
                'in_progress',
                'completed',
                'cancelled',
            ])->default('pending');

            $table->date('scheduled_date')->nullable();

            $table->date('completed_date')->nullable();

            $table->decimal('cost', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenances');
    }
};
