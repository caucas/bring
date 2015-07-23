<?php namespace Macrobit\Bring\Classes;

use Model;
use Input;
use Request;
use System\Models\File;
use Macrobit\Bring\Classes\BaseService;

class GoodsService extends BaseService
{
    use \October\Rain\Support\Traits\Singleton;

    protected $resource    = 'goods';
    protected $collection  = 'Macrobit\Bring\Models\Goods';

    public function init()
    {
        parent::init();
    }

    protected function addRoutes()
    {

        $this->addGetRoute('/{id}/images', function($id){
            $model = $this->get($id);
            return $model ? $model->images : response(null, 404);
        });

        $this->addPostRoute('/{id}/images', function($id){
            $model = $this->get($id);
            if (is_null($model)) return response(null, 404);
            $file = new File;
            $file->fromPost(Input::file('file'));
            if ($file->isImage()) {
                if ($model->imageExists($file)) {
                    return response([
                        'message' => 'Duplicates are not allowed.'], 406);
                }
                $file->is_public = true;
                $file->save();
                $model->images()->add($file);
                return $file;
            }
            return response([
                'message' => 'The \'file\' must be an image.'], 406);
        });

        $this->addGetRoute('/{id}/images/{imageId}', function($id, $imageId){
            $model = $this->get($id);
            if (is_null($model)) return response(null, 404);
            $image = $model->images()->where('id', '=', $imageId)->first();
            if ($image) {
                return $image;
            }
            return response(null, 404);
        });

        $this->addDeleteRoute('/{id}/images/{imageId}', function($id, $imageId){
            $model = $this->get($id);
            if (is_null($model)) return response(null, 404);
            $image = $model->images()->where('id', '=', $imageId)->first();
            if ($image) {
                $image->delete();
                return $image;
            }
            return response(null, 404);
        });

        $this->addGetRoute('/{id}/tags', function($id){
            $model = $this->get($id);
            return $model ? $model->tags : response(null, 404);
        });

        $this->addPostRoute('/{id}/tags', function($id){
            $model = $this->get($id);
            if (is_null($model)) return response(null, 404);
            if (Request::isJson()) {
                $ids = Request::all();
                $model->tags()->attach($ids);
                return $model->tags;
            }
            return response(null, 406);
        });
    }

}