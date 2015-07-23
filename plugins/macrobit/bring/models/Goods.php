<?php namespace Macrobit\Bring\Models;

use Model;
use Group;

/**
 * Goods Model
 */
class Goods extends Model
{
    use \October\Rain\Database\Traits\Validation;

    public $rules = [
        'name'  => 'required|between:2,16',
        'shop'  => 'required',
        'price' => 'required'
    ];
    /**
     * @var string The database table used by the model.
     */
    public $table = 'macrobit_bring_goods';

    /**
     * @var array Guarded fields
     */
    protected $guarded = ['*'];

    /**
     * @var array Fillable fields
     */
    protected $fillable = [
        'name',
        'price',
        'shop_id',
        'rawId',
        'description',
        'stock'
    ];

    /**
     * Validation rules
     */
    public $hidden = [
        'created_at',
        'updated_at'
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
        'tags'  => ['Macrobit\Bring\Models\GoodsTag', 'table' => 'macrobit_bring_goods_tags_goods']
    ];
    public $morphTo = [];
    public $morphOne = [];
    public $morphMany = [];
    public $attachOne = [];
    public $attachMany = [
        'images'    => ['System\Models\File']
    ];

    public function beforeSave()
    {
        if (!$this->id) {
            $rawId = $this->rawId;
            if ($rawId) {
                $exists = static::where('shop_id','=', $this->shop_id)->where('rawId', '=', $rawId)->first();
                if ($exists) {
                    $exists->fill($this->toArray());
                    $exists->save();
                    return false;
                }
            }
        }
    }

    public function imageExists($file)
    {
        $hash = md5($file->getContents());
        foreach ($this->images as $image) {
            if (md5($image->getContents()) == $hash)
                return true;
        }
        return false;
    }

}