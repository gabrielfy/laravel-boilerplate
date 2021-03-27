<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Events\Admin\User\UserConfirmed;
use App\Events\Admin\User\UserDeactivated;
use App\Events\Admin\User\UserDeleted;
use App\Events\Admin\User\UserDestroyed;
use App\Events\Admin\User\UserReactivated;
use App\Events\Admin\User\UserRestored;
use App\Events\Admin\User\UserUnconfirmed;
use App\Events\Admin\User\UserUpdated;
use App\Events\Admin\User\UserCreated;
use App\Exceptions\GeneralException;
use App\Models\User;
use Exception;

class UserRepository extends BaseRepository
{
    /*
     * @param User $user
     * @return void
     */
    public function __construct(User $user)
    {
        $this->model = $user;
    }

    /**
     * @param  array  $filters
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function search(array $filters)
    {
        $this->newQuery();

        $models = $this->query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('first_name', 'like', '%'.$search.'%')
                    ->orWhere('last_name', 'like', '%'.$search.'%')
                    ->orWhere('email', 'like', '%'.$search.'%');
            });
        })
            ->orderBy('created_at', 'DESC');

        $this->unsetClauses();

        return $models;
    }

    /**
     * @param  mixed  $data
     * @param  string  $provider
     * @return User
     * @throws GeneralException|\Throwable
     */
    public function registerProvider($data, string $provider): User
    {
        $user = $this->model::where('provider_id', $data->getId())->first();

        if (! $user) {
            DB::beginTransaction();

            try {
                $name = Str::of($data->getName())->explode(' ');

                $user = $this->saveUser(new User(), [
                    'first_name' => $name[0],
                    'last_name' => $name[1] ?? '',
                    'email' => $data->getEmail(),
                    'provider_id' => $data->getId(),
                    'provider' => $provider,
                    'email_verified_at' => now(),
                ]);

                $user->syncRoles(config('boilerplate.auth.role.default'));
            } catch (Exception) {
                DB::rollBack();
                throw new GeneralException(__('There was a problem connecting to :provider.', ['provider' => $provider]));
            }

            DB::commit();
        }

        return $user;
    }

    /**
     * @param  array  $data
     * @return User
     * @throws GeneralException|\Throwable
     */
    public function store(array $data): User
    {
        DB::beginTransaction();

        try {
            $user = $this->saveUser(new User(), [
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'password' => $data['password'],
                'active' => isset($data['active']) && $data['active'] === '1',
                'email_verified_at' => ! isset($data['send_confirmation_email']) ? now() : null
            ]);

            $user->syncRoles($data['roles'] ?? []);

            if (isset($data['send_confirmation_email']) && $data['send_confirmation_email'] === '1') {
                $user->sendEmailVerificationNotification();
            }

            event(new UserCreated($user));
        } catch (Exception $e) {
            DB::rollBack();
            dd( $e->getMessage());
            throw new GeneralException(__('There was a problem creating this user. Please try again.'));
        }

        DB::commit();

        return $user;
    }

    /**
     * @param  User  $user
     * @param  array  $data
     * @return User
     * @throws GeneralException
     * @throws \Throwable
     */
    public function update(User $user, array $data): User
    {
        DB::beginTransaction();

        try {
            $this->saveUser($user, $data);

            $user->syncRoles($data['roles'] ?? []);

            event(new UserUpdated($user));
        } catch (Exception) {
            DB::rollBack();

            throw new GeneralException(__('There was a problem updating this user. Please try again.'));
        }

        DB::commit();

        return $user;
    }

    /**
     * @param  User  $user
     * @return User
     * @throws GeneralException
     */
    public function delete(User $user): User
    {
        if (auth()->id() === $user->id) {
            throw new GeneralException(__('You can not delete yourself.'));
        }

        if ($this->deleteById($user->id)) {
            event(new UserDestroyed($user));

            return $user;
        }

        throw new GeneralException(__('There was a problem deleting this user. Please try again.'));
    }

    /**
     * @param  User  $user
     * @param  bool  $status
     * @return User
     * @throws GeneralException
     */
    public function changeVerification(User $user, bool $status): User
    {
        if ($status === true && $user->isVerified()) {
            throw new GeneralException(__('User already comfirmed.'));
        }

        if ($status === false && ! $user->isVerified()) {
            throw new GeneralException(__('User already unconfirmed.'));
        }

        if ($status === false && auth()->id() === $user->id) {
            throw new GeneralException(__('User cannot uncomfirmed himself.'));
        }

        $user->email_verified_at = $status ? now() : null;

        if ($user->save()) {
            if ($status) {
                event(new UserConfirmed($user));
            } else {
                event(new UserUnconfirmed($user));
            }

            return $user;
        }

        throw new GeneralException(__('There was a problem updating this user. Please try again.'));
    }

    /**
     * @param  User  $user
     * @param  boolean  $status
     * @return User
     * @throws GeneralException
     */
    public function mark(User $user, bool $status): User
    {
        if ($status === false && auth()->id() === $user->id) {
            throw new GeneralException(__('You can not do that to yourself.'));
        }

        if ($status === false && $user->isMasterAdmin()) {
            throw new GeneralException(__('You can not deactivate the administrator profile.'));
        }

        $user->active = $status;

        if ($user->save()) {
            if ($status) {
                event(new UserReactivated($user));
            } else {
                event(new UserDeactivated($user));
            }

            return $user;
        }

        throw new GeneralException(__('There was a problem updating this user. Please try again.'));
    }

    /**
     * @param  User  $user
     * @return User
     * @throws GeneralException
     */
    public function restore(User $user): User
    {
        if ($user->deleted_at === null) {
            throw new GeneralException(__('You must first delete the user.'));
        }

        if ($user->restore()) {
            event(new UserRestored($user));

            return $user;
        }

        throw new GeneralException(__('There was a problem restoring this user. Please try again.'));
    }

    /**
     * @param  User  $user
     * @return bool
     * @throws GeneralException
     */
    public function permanentlyDelete(User $user): bool
    {
        if ($user->isMasterAdmin()) {
            throw new GeneralException(__('You cannot permanently delete the administrator profile.'));
        }

        if ($user->deleted_at === null) {
            throw new GeneralException(__('You must first delete the user.'));
        }

        if ($user->forceDelete()) {
            event(new UserDeleted($user));

            return true;
        }

        throw new GeneralException(__('There was a problem permanently deleting this user. Please try again.'));
    }

    /**
     * @param  User  $user
     * @param  array  $data
     * @return User
     * @throws GeneralException
     */
    public function updatePassword(User $user, $data = []): User
    {
        $user->password = $data['password'];

        if ($user->save()) {
            return $user;
        }

        throw new GeneralException(__('There was a problem updating your password. Please try again.'));
    }

    /**
     * @param  User  $user
     * @return void
     * @throws GeneralException
     */
    public function resendEmailVerification(User $user)
    {
        if ($user->isVerified()) {
            throw new GeneralException(__('This user is already confirmed.'));
        }

        $user->sendEmailVerificationNotification();
    }

    /**
     * @param  User  $user
     * @param  array  $data
     * @return User
     */
    private function saveUser(User $user, array $data): User
    {
        return tap($user, function($user) use ($data) {
            $user->fill($data)->save();
        });
    }
}
