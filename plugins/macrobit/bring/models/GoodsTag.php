<?php namespace Macrobit\Bring\Models;

use Model;

/**
 * GoodsTag Model
 */
class GoodsTag extends Model
{
    /**
     * @var string The database table used by the model.
     */
    public $table = 'macrobit_bring_goods_tags';

    /**
     * @var array Guarded fields
     */
    protected $guarded = ['*'];

    /**
     * @var array Fillable fields
     */
    protected $fillable = [];

    public $hidden = [
        'created_at',
        'updated_at',
        'pivot'
    ];

    /**
     * @var array Relations
     */
    public $hasOne = [];
    public $hasMany = [];
    public $belongsTo = [];
    public $belongsToMany = [];
    public $morphTo = [];
    public $morphOne = [];
    public $morphMany = [];
    public $attachOne = [];
    public $attachMany = [];

}