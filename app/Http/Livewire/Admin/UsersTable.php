<?php

namespace App\Http\Livewire\Admin;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Rappasoft\LaravelLivewireTables\TableComponent;
use Rappasoft\LaravelLivewireTables\Traits\HtmlComponents;
use Rappasoft\LaravelLivewireTables\Views\Column;

/**
 * Class UsersTable.
 */
class UsersTable extends TableComponent
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
        $query = User::query();

        if ($this->status === 'deleted') {
            return $query->onlyTrashed();
        }

        if ($this->status === 'deactivated') {
            return $query->onlyDeactivated();
        }

        return $query->onlyActive();
    }

    /**
     * @return array
     */
    public function columns(): array
    {
        return [
            Column::make(__('Avatar'))
                ->format(function(User $model) {
                    return $this->image($model->profile_photo_url, $model->name, ['class' => 'c-avatar-img', 'style' => 'width: 2.25rem;']);
                }),
            Column::make(__('Name'), 'name')
                ->searchable()
                ->sortable(),
            Column::make(__('Email'), 'email')
                ->searchable()
                ->sortable()
                ->format(function (User $model) {
                    return $this->mailto($model->email);
                }),
            Column::make(__('Actions'))
                ->format(function (User $model) {
                    return view('admin.users.includes.actions', ['user' => $model]);
                }),
        ];
    }
}
