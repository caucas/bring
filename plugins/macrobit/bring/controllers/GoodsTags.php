<?php namespace Macrobit\Bring\Controllers;

use BackendMenu;
use Backend\Classes\Controller;

/**
 * Goods Tags Back-end Controller
 */
class GoodsTags extends Controller
{
    public $implement = [
        'Backend.Behaviors.FormController',
        'Backend.Behaviors.ListController'
    ];

    public $formConfig = 'config_form.yaml';
    public $listConfig = 'config_list.yaml';

    public $requiredPermissions = ['macrobit.bring.goodstags'];

    public function __construct()
    {
        parent::__construct();

        BackendMenu::setContext('Macrobit.Bring', 'bring', 'goodstags');
    }
}