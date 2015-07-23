<?php namespace Macrobit\Bring\Controllers;

use BackendMenu;
use Backend\Classes\Controller;

/**
 * Goods Back-end Controller
 */
class Goods extends Controller
{
    public $implement = [
        'Backend.Behaviors.FormController',
        'Backend.Behaviors.ListController',
        'Backend.Behaviors.RelationController'
    ];

    public $formConfig = 'config_form.yaml';
    public $listConfig = 'config_list.yaml';
    public $relationConfig = 'config_relation.yaml';

    public $requiredPermissions = ['macrobit.bring.goods'];

    public function __construct()
    {
        parent::__construct();

        BackendMenu::setContext('Macrobit.Bring', 'bring', 'goods');
    }
}