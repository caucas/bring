<?php namespace Macrobit\Bring\Classes;

use Macrobit\Bring\Classes\BaseService;

class CategoryService extends BaseService 
{
    use \October\Rain\Support\Traits\Singleton;

    protected $resource = 'categories';
    protected $collection = 'Macrobit\Bring\Models\Category';

    public function init()
    {
        parent::init();
    }

    protected function addRoutes()
    {
        $this->addGetRoute('/{id}/tags', function($id){
            $model = $this->get($id);
            return $model ? $model->tags : response(null, 404);
        });
    }

}