<?php namespace Macrobit\Bring\Controllers;

use BackendMenu;
use Backend\Classes\Controller;

/**
 * Shops Back-end Controller
 */
class Shops extends Controller
{
    public $implement = [
        'Backend.Behaviors.FormController',
        'Backend.Behaviors.ListController',
        'Backend.Behaviors.RelationController'
    ];

    public $formConfig = 'config_form.yaml';
    public $listConfig = 'config_list.yaml';
    public $relationConfig = 'config_relation.yaml';

    public $bodyClass = 'compact-container';

    public $requiredPermissions = ['macrobit.bring.shops'];

    public function __construct()
    {
        parent::__construct();

        BackendMenu::setContext('Macrobit.Bring', 'bring', 'shops');
    }

}