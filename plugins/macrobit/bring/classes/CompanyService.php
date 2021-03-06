<?php namespace Macrobit\Bring\Classes;

use Model;
use Request;
use Macrobit\Bring\Classes\BaseService;
use Macrobit\Bring\Classes\ShopService;

class CompanyService extends BaseService
{
    use \October\Rain\Support\Traits\Singleton;

    protected $resource   = 'companies';
    protected $collection = 'Macrobit\Bring\Models\Company';

    public function init()
    {
        parent::init();
    }

    protected function addRoutes()
    {
        $this->addGetRoute('/{id}/shops', function(){
            $model = $this->get($id);
            return $model ? $model->shops : response(null, 404);
        });

        $this->addPostRoute('/{id}/shops', function($id){
            $model = $this->get($id);
            if (is_null($model)) return response(null, 404);
            if (Request::isJson()) {
                $attributes = Request::all();
                $attributes['company_id'] = $id;
                $success = ShopService::instance()->create($attributes);
                if ($success)
                    return $success instanceof Model ? $success : response($success, 406);
            }
            return response(null, 406);
        });
    }

}