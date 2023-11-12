<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Models\Image;

class ImageController extends Controller
{
    use ApiResponse;
    public function store(Request $request) {
        if($request->hasFile("image")) {
            $image = $request->file("image");
            $imageName = time() . ".". $image->getClientOriginalExtension();
            $image->move(public_path("/images"), $imageName);
    
            $image = Image::create([
                'image' => $imageName,
            ]);
            
            return response()->json($this->apiResponse($imageName, "created", 200));
        }
        return response()->json($this->apiResponse(null,"",404));
    }

    public function getImage($id) {
        $image = Image::find($id);
    
        if (!$image) {
            return response('not found', 404);
        }
    
        $imagePath = public_path("images/" . $image->image);
    
        if (file_exists($imagePath)) {
            return response()->file($imagePath, ['Content-Type' => 'application/png']);
        } else {
            return response('File not found', 404);
        }
    }
    
}
