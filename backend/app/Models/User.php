<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

public function subscriptions()
{
    return $this->hasMany(Subscription::class, 'member_id');
}

public function reservations()
{
    return $this->hasMany(Reservation::class, 'member_id');
}

public function coachReservations()
{
    return $this->hasMany(Reservation::class, 'coach_id');
}

public function coachAvailabilities()
{
    return $this->hasMany(CoachAvailability::class, 'coach_id');
}

public function programsAsMember()
{
    return $this->hasMany(Program::class, 'member_id');
}

public function programsAsCoach()
{
    return $this->hasMany(Program::class, 'coach_id');
}

public function attendances()
{
    return $this->hasMany(Attendance::class, 'member_id');
}

public function progressRecords()
{
    return $this->hasMany(ProgressRecord::class, 'member_id');
}

public function coachProgressRecords()
{
    return $this->hasMany(ProgressRecord::class, 'coach_id');
}

public function activities()
{
    return $this->belongsToMany(Activity::class, 'activity_coach', 'coach_id', 'activity_id')
        ->withTimestamps();
}
}
