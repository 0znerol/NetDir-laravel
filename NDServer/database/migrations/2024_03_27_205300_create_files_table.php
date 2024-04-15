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
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->string('file_name');
            $table->string('file_location');
            $table->string('category');
            $table->bigInteger('file_size');
            $table->foreignId('user');
            $table->unique(['file_name', 'user']);
            $table->foreign('user')->on('users')->references('id')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('folder')->nullable();
            $table->foreign('folder')->on('folders')->references('id')->onDelete('set null')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
