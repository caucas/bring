<?php namespace Macrobit\Bring\Classes;

use Model;
use Route;
use Request;
use BackendAuth;
use Illuminate\Http\Response;
use October\Rain\Database\ModelException;

abstract class BaseService 
{
    protected $resource    = null;
    protected $collection  = null;

    private $onGet       = [];
    private $onPost      = [];
    private $onPut       = [];
    private $onDelete    = [];

    public function init()
    {
        $this->addDefaultRoutes();
        $this->addRoutes();
        Route::group(['prefix' => 'rest', 'before' => 'auth'], function(){
            $this->registerFilters();
            $this->registerRoutes();
        });
    }

    private function registerRoutes()
    {
        foreach ($this->onGet as $path => $closure) {
            Route::get($this->resource . $path, $closure);
        }
        foreach ($this->onPost as $path => $closure) {
            Route::post($this->resource . $path, $closure);
        }
        foreach ($this->onPut as $path => $closure) {
            Route::put($this->resource . $path, $closure);
        }
        foreach ($this->onDelete as $path => $closure) {
            Route::delete($this->resource . $path, $closure);
        }
    }

    protected function registerFilters()
    {
        Route::filter('auth', function(){
            if (!BackendAuth::check()) {
                return response(['message' => 'Authorization required.'], 401);
            }
            if (!BackendAuth::getUser()->isSuperUser()) {
                return response(['message' => 'Only superuser has access to this resource'], 403);
            }
        });
    }

    protected function addGetRoute($path, $closure)
    {
        $this->onGet[$path] = $closure;
    }

    protected function addPostRoute($path, $closure)
    {
        $this->onPost[$path] = $closure;
    }

    protected function addPutRoute($path, $closure)
    {
        $this->onPut[$path] = $closure;
    }

    protected function addDeleteRoute($path, $closure)
    {
        $this->onDelete[$path] = $closure;
    }

    protected abstract function addRoutes();

    protected function addDefaultRoutes()
    {
        $this->addGetRoute('/', function(){
            return $this->getAll();
        });

        $this->addGetRoute('/{id}', function($id){
            return $this->get($id) ?: response(null, 404);
        });

        $this->addPostRoute('/', function(){
            if (Request::isJson())
                $success = $this->create(Request::all());
                if ($success) {
                    return $success instanceof Model ? $success : response($success, 406);
                }
            return response(null, 406);
        });

        $this->addPutRoute('/', function(){
            if (Request::isJson()) {
                $success = $this->update(Request::all());
                if ($success) {
                    return $success instanceof Model ? $success : response($success, 406);
                }
                return response(null, 404);
            }
            return response(null, 406);
        });

        $this->addDeleteRoute('/{id}', function($id){
            $response = $this->delete($id);
            if ($response) return $response;
            return response(null, 404);
        });
    }


    public function getAll()
    {
        return call_user_func(array($this->collection, 'all'));
    }

    public function get($id)
    {
        return call_user_func(array($this->collection, 'find'), $id);
    }

    public function create($attributes)
    {
        $model = new $this->collection;
        $model->fill($attributes);
        try {
            $model->save();
        } catch (ModelException $e) {
            return $model->errors()->all();
        }
        return $model;
    }

    public function update($attributes)
    {
        $model = call_user_func(array($this->collection, 'find'), $attributes['id']);
        if ($model) {
            $model->fill($attributes);
            try {
                $model->save();
            } catch (ModelException $e) {
                return $model->errors()->all();
            }
        }
        return $model;
    }

    public function delete($id)
    {
        $model = $this->get($id);
        if ($model) $model->delete();
        return $model;
    }

}