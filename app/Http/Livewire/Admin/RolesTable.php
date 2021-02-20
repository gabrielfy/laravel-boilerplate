<?php

namespace App\Http\Livewire\Admin;

use App\Models\Role;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\TableComponent;
use Rappasoft\LaravelLivewireTables\Traits\HtmlComponents;
use Rappasoft\LaravelLivewireTables\Views\Column;

/**
 * Class RolesTable.
 */
class RolesTable extends TableComponent
{
    use HtmlComponents;

    /**
     * @var string
     */
    public $sortField = 'name';

    /**
     * @var string
     */
    public $status;

    /**
     * @var int
     */
    public $perPage = 10;

    /**
     * @var array
     */
    protected $options = [
        'bootstrap.container' => false,
        'bootstrap.classes.table' => 'table table-responsive-sm table-hover mb-0 ',
    ];

    /**
     * @param string $status
     */
    public function mount($status = null)
    {
        $this->status = $status;
    }

    /**
     * @return Builder
     */
    public function query(): Builder
    {
        return Role::query();
    }

    /**
     * @return array
     */
    public function columns(): array
    {
        return [
            Column::make(__('Name'), 'name')
                ->searchable()
                ->sortable(),
            Column::make(__('Number of users'))
                ->format(function(Role $model) {
                    return $model->users()->count();
                }),
            Column::make(__('Actions'))
                ->format(function (Role $model) {
                    return view('admin.roles.includes.actions', ['role' => $model]);
                }),
        ];
    }
}
