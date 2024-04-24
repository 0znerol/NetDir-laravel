<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFolderRequest;
use App\Http\Requests\UpdateFolderRequest;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;



class FolderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = Auth::user()->id;
        return Folder::where('user', $userId)->get();
    }

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
    public function store(StoreFolderRequest $request)
    {
        if ($request->has('folder')) {
            $folder = new Folder();
            $folder->folder_name = $request->folder;
            $folder->user = Auth::user()->id;
            $folder->save();
            return response()->json(['message' => 'Folder created successfully']);
        }
        return response()->json(['message' => 'Folder name is required'], 400);

    }

    /**
     * Display the specified resource.
     */
    public function show(Folder $folder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Folder $folder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFolderRequest $request, Folder $folder)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($folder_id)
    {
        try {
            $folder = Folder::findOrFail($folder_id);
            if ($folder->user == Auth::user()->id){
                $folder->delete();
                return response()->json(Folder::where("user", Auth::user()->id)->get());
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
