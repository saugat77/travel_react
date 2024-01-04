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

        $destination =  new DestinationModel();
        $destination->title = $createDestination['title'];
        $destination->location = $createDestination['location'];
        $destination->category = $createDestination['category'];
        $destination->fees = $createDestination['fees'];
        $destination->description = $createDestination['description'];
        $destination->is_active = $createDestination['is_active'];
        if ($request->has('image_src')) {
            $image = $request->file('image_src');
            $name = $this->imageReplace($image);

            // Update the destination's image_src with the file path
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
        $destination->title = $data['title'];
        $destination->location = $data['location'];
        $destination->category = $data['category'];
        $destination->fees = $data['fees'];
        $destination->description = $data['description'];
        $destination->is_active = $data['is_active'];
        if ($request->file('image_src')) {
            $image = $request->file('image_src');
            $name = $this->imageReplace($image);

            // Update the destination's image_src with the file path
            $destination->image_src = $name;
        }
        $destination->update();
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
    public function imageReplace($image)
    {

        $name = time() . '.' . $image->getClientOriginalExtension();

        // Store the file in the 'public/destinations' directory
        $filePath = $image->storeAs('public/destinations', $name);
        $src = 'destinations/' . $name;
        return $src;
    }
}
