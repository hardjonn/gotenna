<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Image extends Model
{
    protected $fillable = ['url', 'image_id', 'width', 'height'];

    public static function clearTable()
    {
        self::truncate();
    }

    public static function saveImagesList($images)
    {
        return self::insert($images);
    }

    public static function getPaginatedList($params)
    {
        $perPage = $params['perPage'];
        $dims = $params['dims'];

        $images = self::select();

        if ($dims) {
            foreach ($dims as $dim) {
                $images->orWhere(function ($query) use ($dim) {
                    $query
                        ->where('width', $dim['width'])
                        ->where('height', $dim['height']);
                });
            }
        }

        return $images->paginate($perPage);
    }

    /**
     * select width, heigh, count(id) group by width, height
     *
     * @return void
     */
    public static function getDimGroups()
    {
        return self::select(DB::raw('COUNT(id) as qty, width, height'))
            ->groupBy('width', 'height')
            ->orderBy('qty', 'DESC')
            ->orderBy('width', 'DESC')
            ->orderBy('height', 'DESC')
            ->get();
    }

    public static function getImageUrlById($imageId)
    {
        return self::select('url')
            ->whereId($imageId)
            ->value('url');
    }
}
