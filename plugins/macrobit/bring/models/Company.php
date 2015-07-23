<?php namespace Macrobit\Bring\Models;

use Model;

/**
 * Company Model
 */
class Company extends Model
{

    /**
     * @var string The database table used by the model.
     */
    public $table = 'macrobit_bring_companies';

    /**
     * @var array Guarded fields
     */
    protected $guarded = ['*'];

    /**
     * @var array Fillable fields
     */
    protected $fillable = [
        'id'
    ];

    /**
     * @var array Relations
     */
    public $hasOne = [];
    public $hasMany = [
        'shops'  => ['Macrobit\Bring\Models\Shop'],
        'users' => ['Backend\Models\User']
    ];
    public $belongsTo = [];
    public $belongsToMany = [];
    public $morphTo = [];
    public $morphOne = [];
    public $morphMany = [];
    public $attachOne = [
        'logo'  => ['System\Models\File']
    ];
    public $attachMany = [];

}