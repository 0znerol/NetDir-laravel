<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\FilesController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

// Route::get('storage/app/user_{userId}/uploadedFiles/{category}/{filename}', function ($userId, $category, $filename )
// {
//     $path = storage_path('app/user_' . $userId . '/uploadedFiles/' . $category . "/" . $filename);

//     if (!File::exists($path)) {
//         abort(404);
//     }

//     $file = File::get($path);
//     $type = File::mimeType($path);

//     $response = Response::make($file, 200);
//     $response->header("Content-Type", $type);

//     return $response;
// });
// Route::get('storage/app/public/user_{userId}/uploadedFiles/{category}/{filename}', 'App\Http\Controllers\FilesController@show');

require __DIR__.'/auth.php';
