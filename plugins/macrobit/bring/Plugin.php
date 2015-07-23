<?php namespace Macrobit\Bring;

use Lang;
use Backend;
use BackendAuth;
use Backend\Models\User as BackendUser;
use Backend\Models\UserGroup as BackendUserGroup;
use System\Classes\PluginBase;
use Macrobit\Bring\Classes\RESTManager;
use Macrobit\Bring\Classes\RegionService;
use Macrobit\Bring\Classes\ShopService;
use Macrobit\Bring\Classes\CompanyService;
use Macrobit\Bring\Classes\GoodsService;
use Macrobit\Bring\Classes\CategoryService;

/**
 * Bring Plugin Information File
 */
class Plugin extends PluginBase
{

    /**
     * Returns information about this plugin.
     *
     * @return array
     */
    public function pluginDetails()
    {
        return [
            'name'        => Lang::get('macrobit.bring::lang.bring.title'),
            'description' => Lang::get('macrobit.bring::lang.bring.description'),
            'author'      => 'Macrobit',
            'icon'        => 'icon-taxi'
        ];
    }

    /**
    * Returns information about permissions.
    *
    * @return array
    */
    public function registerPermissions()
    {
        return [
            /**
             * Tab Bring
             */
            'macrobit.bring.regions'    => [
                'label' => Lang::get('macrobit.bring::lang.permissions.regions'),
                'tab' => 'Bring'
            ],
            'macrobit.bring.companies'   => [
                'label' => Lang::get('macrobit.bring::lang.permissions.companies'),
                'tab' => 'Bring'
            ],
            'macrobit.bring.shops'      => [
                'label' => Lang::get('macrobit.bring::lang.permissions.shops'),
                'tab' => 'Bring'
            ],
            'macrobit.bring.goods'      => [
                'label' => Lang::get('macrobit.bring::lang.permissions.goods'),
                'tab' => 'Bring'
            ],
            'macrobit.bring.goodstags'      => [
                'label' => Lang::get('macrobit.bring::lang.permissions.goodstags'),
                'tab' => 'Bring'
            ],
            'macrobit.bring.categories'      => [
                'label' => Lang::get('macrobit.bring::lang.permissions.categories'),
                'tab' => 'Bring'
            ],
            /**
             * Tab Bring REST
             */
            'macrobit.bring.access_rest.get'       => [
                'label' => 'GET',
                'tab' => 'Bring REST'
            ],
            'macrobit.bring.access_rest.post'      => [
                'label' => 'POST',
                'tab' => 'Bring REST'
            ],
            'macrobit.bring.access_rest.delete'    => [
                'label' => 'DELETE',
                'tab' => 'Bring REST'
            ],
            'macrobit.bring.access_rest.put'       => [
                'label' => 'PUT',
                'tab' => 'Bring REST'
            ]
        ];
    }

    /**
     * Returns information about navigation menu in backend.
     *
     * @return array
     */
    public function registerNavigation()
    {
        return [
            'bring' => [
                'label'       => Lang::get('macrobit.bring::lang.bring.title'),
                'url'         => Backend::url('macrobit/bring/goods'),
                'icon'        => 'icon-taxi',
                'permissions' => ['macrobit.bring.*'],
                'order'       => 500,

                'sideMenu'    => [
                    'regions'   => [
                        'label'         => Lang::get('macrobit.bring::lang.regions.title'),
                        'icon'          => 'icon-pie-chart',
                        'url'           => Backend::url('macrobit/bring/regions'),
                        'permissions'   => ['macrobit.bring.regions']
                    ],
                    'companies'   => [
                        'label'         => Lang::get('macrobit.bring::lang.companies.title'),
                        'icon'          => 'icon-building',
                        'url'           => Backend::url('macrobit/bring/companies'),
                        'permissions'   => ['macrobit.bring.companies']
                    ],
                    'shops'   => [
                        'label'         => Lang::get('macrobit.bring::lang.shops.title'),
                        'icon'          => 'icon-shopping-cart',
                        'url'           => Backend::url('macrobit/bring/shops'),
                        'permissions'   => ['macrobit.bring.shops']
                    ],
                    'goods'   => [
                        'label'         => Lang::get('macrobit.bring::lang.goods.title'),
                        'icon'          => 'icon-cubes',
                        'url'           => Backend::url('macrobit/bring/goods'),
                        'permissions'   => ['macrobit.bring.goods']
                    ],
                    'categories'   => [
                        'label'         => Lang::get('macrobit.bring::lang.categories.title'),
                        'icon'          => 'icon-list-ul',
                        'url'           => Backend::url('macrobit/bring/categories'),
                        'permissions'   => ['macrobit.bring.categories']
                    ],
                    'goodstags'   => [
                        'label'         => Lang::get('macrobit.bring::lang.goodstags.title'),
                        'icon'          => 'icon-tag',
                        'url'           => Backend::url('macrobit/bring/goodstags'),
                        'permissions'   => ['macrobit.bring.goodstags']
                    ]
                ]
            ]
        ];
    }

    public function boot()
    {
        BackendUser::extend(function($model){
            $model->belongsTo['company'] = ['Macrobit\Bring\Models\Company'];
            $model->belongsTo['shop'] = ['Macrobit\Bring\Models\Shop'];
            $model->belongsTo['region'] = ['Macrobit\Bring\Models\Region'];
            $model->addDynamicMethod('listGroups', function(){
                $result = [];
                $groups = null;
                if (($user = BackendAuth::getUser())
                    && ($user->isSuperUser())) {
                    $groups = BackendUserGroup::all();
                } else {
                    $groups = $user->groups;
                }
                foreach ($groups as $group) {
                    $result[$group->id] = [$group->name, $group->description];
                }
                return $result;
            });
        });

        $this->registerServices();
    }

    public function registerServices()
    {
        ShopService     ::instance();
        RegionService   ::instance();
        CompanyService  ::instance();
        GoodsService    ::instance();
        CategoryService ::instance();
    }

}
