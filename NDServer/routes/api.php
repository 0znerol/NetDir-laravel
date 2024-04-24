<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FilesController;
use App\Http\Controllers\FolderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/allFiles', [FilesController::class, 'index']);
Route::post('/uploadFile', [FilesController::class, 'store']);
Route::post('/updateFile/{file_id}', [FilesController::class, 'update']);
Route::post('/fetchFilesByDate', [FilesController::class, 'fetchFilesByDate']);
Route::delete('/deleteFile/{file_id}', [FilesController::class, 'destroy']);
Route::post('/addFolder', [FolderController::class, 'store']);
Route::get('/allFolders', [FolderController::class, 'index']);
Route::post('/addFileInFolder', [FilesController::class, 'addFileInFolder']);
Route::delete('/deleteFolder/{folder_id}', [FolderController::class, 'destroy']);
Route::get('/show/{file_id}', [FilesController::class, 'show']);
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

