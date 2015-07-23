<?php namespace Macrobit\Bring\Models;

use Model;
use BackendAuth;

/**
 * Shop Model
 */
class Shop extends Model
{

    /**
     * @var string The database table used by the model.
     */
    public $table = 'macrobit_bring_shops';

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
        'address',
        'company_id',
        'region_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    /**
     * @var array Relations
     */
    public $hasOne = [];
    public $hasMany = [
        'goods'      => ['Macrobit\Bring\Models\Goods']
    ];
    public $belongsTo = [
        'region'     => ['Macrobit\Bring\Models\Region'],
        'company'    => ['Macrobit\Bring\Models\Company']
    ];
    public $belongsToMany = [];
    public $morphTo = [];
    public $morphOne = [];
    public $morphMany = [];
    public $attachOne = [
        'logo'  => ['System\Models\File']
    ];
    public $attachMany = [
        'images'  => ['System\Models\File']
    ];

    public function afterFetch()
    {
        $this->schedule = json_decode($this->schedule);
    }

}