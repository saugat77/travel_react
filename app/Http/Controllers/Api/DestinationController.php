<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DestinationRequest;
use App\Http\Resources\DestinationResource;
use App\Models\DestinationModel;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $destinations = DestinationModel::orderBy('id', 'desc')->paginate(10);
        return DestinationResource::collection($destinations);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $createDestination = $request->validate([
            'title' => 'required',
            'location' => 'required',
            'category' => 'required',
            'fees' => 'required',
            'description' => 'required',
            'is_active' => 'required',
        ]);
        return $request;
        $destination =  new DestinationModel();
        $destination->title = $createDestination['title'];
        $destination->location = $createDestination['location'];
        $destination->category = $createDestination['category'];
        $destination->fees = $createDestination['fees'];
        $destination->description = $createDestination['description'];
        $destination->is_active = $createDestination['is_active'];
        if ($request->has('image_src')) {
            $image =  $request->file('image_src');
            $name = time() . '.' . $image->getClientOriginalExtension();
            $finalImage =  $image->storeAs(public_path() . '/destiantions/' . $name);
            $destination->image_src = $name;
        }
        $destination->save();
        return new DestinationResource($destination);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DestinationRequest $request)
    {
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $destination = DestinationModel::find($id);
        return new DestinationResource($destination);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'title' => 'required',
            'image_src' => 'nullable',
            'location' => 'required',
            'category' => 'required',
            'fees' => 'required',
            'description' => 'required',
            'is_active' => 'required',
        ]);
        $destination = DestinationModel::find($id);
        $destination->update($data);
        return new DestinationResource($destination);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($id)
    {
        $destinations = DestinationModel::find($id)->delete();
        return response("", 204);
    }
    public function imageReplace($id)
    {
        $replace = DestinationModel::find($id);
        $replace->image_src = '';
        $replace->update();
        return new DestinationResource($replace);
    }
}
