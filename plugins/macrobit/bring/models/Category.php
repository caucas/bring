<?php namespace Macrobit\Bring\Models;

use Model;

/**
 * Category Model
 */
class Category extends Model
{
    use \October\Rain\Database\Traits\NestedTree;

    /**
     * @var string The database table used by the model.
     */
    public $table = 'macrobit_bring_categories';

    /**
     * @var array Guarded fields
     */
    protected $guarded = ['*'];

    /**
     * @var array Fillable fields
     */
    protected $fillable = [
        'id', 'shop', 'parent',
        'nest_left',
        'nest_right',
        'nest_depth'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    /**
     * @var array Relations
     */
    public $hasOne = [];
    public $hasMany = [];
    public $belongsTo = [
        'shop'  => ['Macrobit\Bring\Models\Shop']
    ];
    public $belongsToMany = [
        'tags'  => ['Macrobit\Bring\Models\GoodsTag', 'table' => 'macrobit_bring_categories_goods_tags', 'key' => 'category_id', 'otherKey' => 'tag_id']
    ];
    public $morphTo = [];
    public $morphOne = [];
    public $morphMany = [];
    public $attachOne = [];
    public $attachMany = [];

}