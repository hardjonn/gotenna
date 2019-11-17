<?php

namespace App\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;

use Facades\App\Services\ImageService;

class ImageController extends Controller
{
    public function upload(Request $request)
    {
        $file = $request->file('file');
        if (!$file) {
            return ['success' => false, 'error' => '__FILE_IS_NOT_PROVIDED__'];
        }

        return ImageService::uploadCsv($file);
    }

    public function list(Request $request)
    {
        $page = $request->get('page', 1);
        $dims = $request->get('dims', null);

        $params = [
            'page' => $page,
            'dims' => $dims,
        ];

        $data = ImageService::getImagesList($params);

        return $data;
    }

    public function effects(Request $request)
    {
        $blurFxMin = config('gallery.fx.blur.min');
        $blurFxMax = config('gallery.fx.blur.max');

        // some basic validation
        $data = $request->validate([
            'id' => 'required|integer',
            'imageId' => 'required|integer',
            'width' => 'required|integer',
            'height' => 'required|integer',
            'url' => 'required|string',
            'filterGrayScale' => 'required|boolean',
            'filterBlur' => "required|min:{$blurFxMin}|max:{$blurFxMax}",
        ]);

        $fxImage = ImageService::applyFx($data);

        return $fxImage;
    }
}
