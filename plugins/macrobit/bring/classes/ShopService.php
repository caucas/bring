<?php namespace Macrobit\Bring\Classes;

use Model;
use Input;
use Request;
use System\Models\File;
use Macrobit\Bring\Classes\BaseService;
use Macrobit\Bring\Classes\GoodsService;
use Macrobit\Bring\Models\Shop as ShopModel;

class ShopService extends BaseService
{
    use \October\Rain\Support\Traits\Singleton;

    protected $resource = 'shops';
    protected $collection = 'Macrobit\Bring\Models\Shop';

    public function init()
    {
        parent::init();
    }

    protected function addRoutes()
    {
        $this->addGetRoute('/{id}/goods', function($id){
            $model = $this->get($id);
            return $model ? $model->goods : response(null, 404);
        });

        $this->addPostRoute('/{id}/goods', function($id){
            $model = $this->get($id);
            if (is_null($model)) return response(null, 404);
            if (Request::isJson()) {
                $attributes = Request::all();
                $attributes['shop_id'] = $id;
                $success = GoodsService::instance()->create($attributes);
                if ($success) {
                    return $success instanceof Model ? $success : response($success, 406);
                }
            }
            return response(null, 406);
        });

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

        $this->addGetRoute('/{id}/logo', function($id){
            $model = $this->get($id);
            if (is_null($model)) return response(null, 404);
            return $model->logo;
        });

        $this->addDeleteRoute('/{id}/logo', function($id){
            $model = $this->get($id);
            if (is_null($model)) return response(null, 404);
            $logo = $model->logo;
            $logo->delete();
            return $logo;
        });

        $this->addPostRoute('/{id}/logo', function($id){
            $model = $this->get($id);
            if (is_null($model)) return response(null, 404);
            $file = new File;
            $file->fromPost(Input::file('file'));
            if ($file->isImage()) {
                $file->is_public = true;
                $file->save();
                if ($model->logo) $model->logo->delete();
                $model->logo()->save($file);
                return $file;
            }
            return response([
                'message' => 'The \'file\' must be an image.'], 406);
        });
    }

}