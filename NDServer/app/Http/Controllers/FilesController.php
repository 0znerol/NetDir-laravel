<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorefilesRequest;
use App\Http\Requests\UpdatefilesRequest;
use App\Http\Requests\DeletefilesRequest;
use App\Models\files;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Models\Folder;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;



class FilesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::user()->id;
        error_log($userId);
        return Files::where('user', $userId)->get();
    }
    // {
    //     error_log(Auth::id());
    //     return files::where('user', Auth::id())->get();
    // }

    public function addFileInFolder(StorefilesRequest $request)
    {

        $file_name = $request->input('fileName');
        $folder_name = $request->input('folderName');
        $file = files::where('file_name', $file_name)->first();
        $folder = Folder::where('folder_name', $folder_name)->first();
        $file->folder = $folder->id;
        $file->save();
        return response()->json(['message' => 'File added to folder successfully']);

    }

    // public function fetchFilesByDate(StorefilesRequest $request)
    // {
    //     $date = $request->input('date');
    //     $id = $request->input('user_id');
    //     $date = Carbon::parse($date);
    //     $counts = [];
    //     for ($i = 0; $i < 7; $i++) {
    //         $fileCount = Files::whereDate('created_at', $date)->where("user", $id)->count();
    //         $counts[] = ['date' => $date->toDateString(), 'count' => $fileCount];
    //         $date->subDay();
    //     }

    //     return response()->json($counts);
    // }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorefilesRequest $request)
    {
        if ($request->hasFile('file')) {
            $extensions = [
                'image' => ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'],
                'video' => ['mp4', 'avi', 'mkv', 'mov', 'flv', 'wmv', 'webm'],
                'audio' => ['mp3', 'wav', 'wma', 'aac', 'flac', 'ogg'],
                'text' => ['txt', 'doc', 'docx', 'pdf', 'rtf', 'odt', 'exp', 'py', 'html', 'css', 'js', 'php', 'java', 'c', 'cpp', 'h', 'hpp', 'cs', 'vb', 'sql', 'xml', 'json', 'yml', 'yaml', 'md', 'csv', 'tsv', 'ini', 'cfg', 'log', 'htaccess', 'env', 'sh', 'bat', 'cmd', 'ps1', 'psm1', 'psd1', 'ps1xml', 'pssc', 'psc1'],
                'file' => ['xls', 'xlsx', 'csv', 'ods', 'xlr', 'zip', 'rar', '7z', 'tar', 'gz', 'exe', 'msi', 'bin', 'apk', 'dmg', 'iso', 'stl'],
            ];
            $file = $request->file('file');
            $fileExtension = $file->getClientOriginalExtension();

            function fileCategory($fileExtension, $extensions) {
                switch ($fileExtension) {
                    case in_array($fileExtension, $extensions['image']):
                        return 'image';
                    case in_array($fileExtension, $extensions['video']):
                        return 'video';
                    case in_array($fileExtension, $extensions['audio']):
                        return 'audio';
                    case in_array($fileExtension, $extensions['text']):
                        return 'text';
                    case in_array($fileExtension, $extensions['file']):
                        return 'file';
                    default:
                        return 'misc';
                }
            }
            

            if(Auth::user()){
                $id = Auth::user()->id;
                $fileRecord = new files;
                $fileRecord->file_location = "uploadedFiles/" . fileCategory($fileExtension, $extensions);
                $fileRecord->file_name = $file->getClientOriginalName();
                $fileRecord->category = fileCategory($fileExtension, $extensions);
                $fileRecord->folder = null;
                $fileRecord->file_size = $file->getSize();
                $fileRecord->user = $id;
                $fileRecord->save();
                $destinationPath = base_path("storage/app/public/" . "user_" . $id . "/uploadedFiles/" . fileCategory($fileExtension, $extensions));

                $file->move($destinationPath, $file->getClientOriginalName());

                return response()->json([
                    'file_name' => $file->getClientOriginalName(),
                ]);
        }else{
            return response()->json(['error' => 'No user id provided'], 400);
        }
        }

        return response()->json(['error' => 'No file uploaded'], 400);
    }
    /**
     * Display the specified resource.
     */
    public function show($fileId)
    {
        $file = files::where('id', $fileId)->first();
        if($file && $file->user === Auth::user()->id){

        $path = storage_path('app/public/user_' . $file->user . '/' . $file->file_location. '/' . $file->file_name);

        if (!File::exists($path)) {
            abort(404);
        }

        $headers = [
            'Content-Type' => File::mimeType($path),
        ];
        ini_set('memory_limit', '512M');
        return response()->stream(function () use ($path) {
            $stream = fopen($path, 'r');
            fpassthru($stream);
            if (is_resource($stream)) {
                fclose($stream);
            }
        }, 200, $headers);
    }

    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(files $files)
    {
        //
    }

    /**
     * Update the specified resource in storage.
        */
    public function update(UpdatefilesRequest $request, $file_id)
    {
        try {
            $file = files::findOrFail($file_id);
            $sameNameFiles = files::where('file_name', $request->input('file_name'))->get();
            if (count($sameNameFiles) > 0) {
                return response()->json(['error' => 'File with the same name already exists'], 400);
            }

            Storage::move("public/"."user_". $file->user . "/" . $file->file_location . '/' . $file->file_name, "public/"."user_". $file->user . "/" . $file->file_location . '/' . $request->input('file_name'));

            $file->file_name = $request->input('file_name');
            $file->save();

            return response()->json(Files::where('user', Auth::user()->id)->get());
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($file_id)
    {
        try {
            $file = files::where('user', Auth::user()->id)->where('id', $file_id)->first();
            //$file = files::findOrFail($file_id);
            if (Storage::exists("public/"."user_".Auth::user()->id."/".$file->file_location . '/' . $file->file_name)) {
                Storage::delete("public/"."user_".Auth::user()->id."/".$file->file_location . '/' . $file->file_name);
                $file->delete();
                return response()->json(files::where('user', Auth::user()->id)->get());
            } else {
                return response()->json(['error' => 'File not found'], 404);
            }

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }





}
