<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Image;
use Illuminate\Support\Facades\Cache;

class ImageService
{
    public function uploadCsv($csv)
    {
        $csvHandle = fopen($csv->getPathName(), 'r');
        if ($csvHandle == false) {
            return [
                'success' => false,
                'error' => '__CANT_READ_UPLOADED_FILE__',
            ];
        }

        $imageRows = [];
        while (($row = fgetcsv($csvHandle)) !== false) {
            $parsedImage = $this->parseImageUrl($row);

            if ($parsedImage) {
                $imageRows[] = $parsedImage;
            }
        }

        fclose($csvHandle);

        $result = $this->saveUploadedImageUrls($imageRows);

        if (!$result) {
            return [
                'success' => false,
                'error' => '__DATABASE_ERROR__',
            ];
        }

        return [
            'success' => true,
        ];
    }

    /**
     * facade method for saving the images list
     *
     * @param array $imagesList
     * @return bool
     */
    public function saveUploadedImageUrls($imagesList)
    {
        // 1. clear the current state of the image table
        Image::clearTable();

        // 2. reset all the gallery cache
        $this->resetCache();

        // 3. Insert new rows into the table
        //  ideally we need to implement this by splitting
        //  data into smaller pieces, i.e. 1000 rows at once
        //  and during the preparation setup the updated_at and created_at fields
        $now = Carbon::now();
        $rowsToInsert = [];

        foreach ($imagesList as $imageRow) {
            $imageRow['updated_at'] = $now;
            $imageRow['created_at'] = $now;

            $rowsToInsert[] = $imageRow;
        }

        $result = Image::saveImagesList($rowsToInsert);
        return $result;
    }

    private function clearDimensionsCache()
    {
        $cacheKey = config('gallery.cache.dim_filter.key');

        if (Cache::has($cacheKey)) {
            Cache::forget($cacheKey);
        }
    }

    private function parseImageUrl($imageRow)
    {
        // we need only the first column
        if (!is_array($imageRow)) {
            return null;
        }

        $imageUrl = $imageRow[0];
        $imageUrl = trim($imageUrl);

        // url example: https://picsum.photos/id/12/300/200
        // we need only the last 3 numbers
        preg_match('/\/(\d+)\/(\d+)\/(\d+)$/', $imageUrl, $imageData);

        if (!$imageData || count($imageData) < 4) {
            return null;
        }

        return [
            'url' => $imageUrl,
            'image_id' => $imageData[1],
            'width' => $imageData[2],
            'height' => $imageData[3],
        ];
    }

    public function getImagesList($params)
    {
        $perPageDefault = config('gallery.paginator.per_page');
        $perPage = $params['perPage'] ?? $perPageDefault;

        // split dimensions
        $dims = [];

        if ($params['dims']) {
            $dimGroups = explode(',', $params['dims']);
            foreach ($dimGroups as $dimGroup) {
                $splitDim = explode('x', $dimGroup);
                $dims[$dimGroup] = [
                    'width' => $splitDim[0] ?? 0,
                    'height' => $splitDim[1] ?? 0,
                ];
            }
        }

        $options = [
            'perPage' => $perPage,
            'dims' => $dims,
        ];
        $data = Image::getPaginatedList($options)->toArray();

        $paginator = $this->getNormalizedPaginator($data);
        $dimFilter = $this->getDimensionFilter($dims);
        $imagesList = $this->prepareImageListData($data['data']);

        return [
            'imageList' => $imagesList,
            'dimFilter' => $dimFilter,
            'paginator' => $paginator,
        ];
    }

    private function prepareImageListData($data)
    {
        return array_map(function ($image) {
            return [
                'id' => (int) $image['id'],
                'imageId' => (int) $image['image_id'],
                'url' => $image['url'],
                'width' => (int) $image['width'],
                'height' => (int) $image['height'],
                'filterGrayScale' => false,
                'filterBlur' => 0,
            ];
        }, $data);
    }

    public function getDimensionFilter($dims)
    {
        $cacheKey = config('gallery.cache.dim_filter.key');
        $cacheTime = config('gallery.cache.dim_filter.time');

        $dimGroups = Cache::remember($cacheKey, $cacheTime, function () {
            return Image::getDimGroups()
                ->map(function ($dim) {
                    $key = $dim['width'] . 'x' . $dim['height'];
                    return [
                        'width' => $dim['width'],
                        'height' => $dim['height'],
                        'qty' => $dim['qty'],
                        'key' => $key,
                        'active' => false,
                    ];
                })
                ->toArray();
        });

        foreach ($dimGroups as &$dimGroup) {
            $key = $dimGroup['key'];
            if (isset($dims[$key])) {
                $dimGroup['active'] = true;
            }
        }

        return $dimGroups;
    }

    public function resetCache()
    {
        $this->clearDimensionsCache();
    }

    /**
     * prepare pagination data
     *
     * @param array $data
     * @return array
     */
    private function getNormalizedPaginator($data)
    {
        // normalize pagination data
        $pagesPerRange = config('gallery.paginator.pages_per_range');
        $totalPages = $data['last_page'];
        $currentPage = $data['current_page'];

        $range = min($pagesPerRange, $totalPages);
        $delta = ceil($range / 2);

        $leftEdge = $currentPage - $delta + 1;
        $rightEdge = $currentPage + $delta - ($range % 2);

        $leftOffset = $leftEdge <= 0 ? -$leftEdge + 1 : 0;
        $rightOffset = $rightEdge > $totalPages ? $totalPages - $rightEdge : 0;

        $leftEdge = $leftEdge + $leftOffset + $rightOffset;
        $rightEdge = $rightEdge + $leftOffset + $rightOffset;

        $pagesInRange = [];
        for ($p = $leftEdge; $p <= $rightEdge; $p++) {
            $pagesInRange[] = $p;
        }

        $paginator = [
            'currentPage' => $currentPage,
            'totalPages' => $totalPages,
            'pagesInRange' => $pagesInRange,
            'lastPage' => $data['last_page'],
            'perPage' => $data['per_page'],

            'hasNextPage' => !!$data['next_page_url'],
            'hasPrevPage' => !!$data['prev_page_url'],

            'docsFrom' => $data['from'],
            'docsTo' => $data['to'],
            'docsTotal' => $data['total'],
        ];

        return $paginator;
    }

    public function applyFx($image)
    {
        $paramGrayScale = config('gallery.fx.parameters.grayscale');
        $paramBlur = config('gallery.fx.parameters.blur');

        // retrieve the source/original url
        $url = Image::getImageUrlById($image['id']);

        $fxUrl = rtrim($url, '/');
        $delimiter = '?';

        if ($image['filterGrayScale']) {
            $fxUrl .= $delimiter . $paramGrayScale;
            $delimiter = '&';
        }

        if ($image['filterBlur']) {
            $fxUrl .= $delimiter . $paramBlur . '=' . $image['filterBlur'];
        }

        $image['url'] = $fxUrl;

        return $image;
    }
}
