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
    Schema::table('users', function (Blueprint $table) {
        $table->string('phone')->nullable()->after('email');
        $table->string('photo')->nullable();
        $table->date('birth_date')->nullable();
        $table->enum('gender', ['homme', 'femme'])->nullable();
        $table->string('address')->nullable();
        $table->boolean('is_active')->default(true);
    });
}

public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn([
            'phone',
            'photo',
            'birth_date',
            'gender',
            'address',
            'is_active',
        ]);
    });
}
};
