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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('member_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->foreignId('coach_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->foreignId('activity_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->date('session_date');

            $table->time('start_time');
            $table->time('end_time');

            $table->enum('status', [
                'pending',
                'accepted',
                'rejected',
                'cancelled',
                'completed',
            ])->default('pending');

            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
