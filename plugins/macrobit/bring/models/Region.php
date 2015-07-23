<?php namespace Macrobit\Bring\Models;

use Model;

/**
 * Region Model
 */
class Region extends Model
{
    use \October\Rain\Database\Traits\Validation;

    public $rules = [
        'name'  => 'required|between:2,16|unique:macrobit_bring_regions'
    ];

    /**
     * @var string The database table used by the model.
     */
    public $table = 'macrobit_bring_regions';

    /**
     * @var array Guarded fields
     */
    protected $guarded = ['*'];

    /**
     * @var array Fillable fields
     */
    protected $fillable = [
        'id',
        'name',
        'orderPriority',
        'contacts'
    ];

    /**
     * @var array Hidden fields
     */
    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    /**
     * @var array Relations
     */
    public $hasOne = [];
    public $hasMany = [
        'shops' => ['Macrobit\Bring\Models\Shop'],
        'users' => ['Backend\Models\User']
    ];
    public $belongsTo = [];
    public $belongsToMany = [];
    public $morphTo = [];
    public $morphOne = [];
    public $morphMany = [];
    public $attachOne = [];
    public $attachMany = [];

}