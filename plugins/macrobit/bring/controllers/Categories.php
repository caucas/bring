<?php namespace Macrobit\Bring\Controllers;

use Lang;
use BackendMenu;
use BackendAuth;
use Backend\Classes\Controller;
use Macrobit\Bring\Models\Category;

/**
 * Categories Back-end Controller
 */
class Categories extends Controller
{
    public $implement = [
        'Backend.Behaviors.FormController',
        'Backend.Behaviors.ListController',
        'Backend.Behaviors.RelationController'
    ];

    public $formConfig = 'config_form.yaml';
    public $listConfig = 'config_list.yaml';
    public $relationConfig = 'config_relation.yaml';

    public $requiredPermissions = ['macrobit.bring.categories'];

    public function __construct()
    {
        parent::__construct();

        BackendMenu::setContext('Macrobit.Bring', 'bring', 'categories');

        $this->addJs('/plugins/macrobit/bring/assets/js/macrobit.categories.js');
    }

    /**
     * Displays the node items in a tree list view so they can be reordered
     */
    public function reorder()
    {
        // Ensure the correct sidemenu is active
        BackendMenu::setContext('Macrobit.Bring', 'bring', 'reorder');

        $this->pageTitle = Lang::get('macrobit.bring::lang.categories.reorder');
        $toolbarConfig = $this->makeConfig();
        $toolbarConfig->buttons = '@/plugins/macrobit/bring/controllers/categories/_reorder_toolbar.htm';
        $this->vars['toolbar'] = $this->makeWidget('Backend\Widgets\Toolbar', $toolbarConfig);
        $rootCategories = Category::make()->getEagerRoot();
        $this->vars['records'] = $rootCategories;

    }
    /**
     * Update the category item position
     */
    public function reorder_onMove()
    {
        $source = Category::find(post('source'));
        $target = post('target') ? Category::find(post('target')) : null;
        if ($source == $target) {
            return;
        }
        switch (post('position')) {
            case 'before':
                $source->moveBefore($target);
                break;
            case 'after':
                $source->moveAfter($target);
                break;
            case 'child':
                $source->makeChildOf($target);
                break;
            default:
                $source->makeRoot();
                break;
        }
    }
}